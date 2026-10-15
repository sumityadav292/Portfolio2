import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./Earth.css";

function createCountryTexture(geoJson) {
	const canvas = document.createElement("canvas");
	canvas.width = 2048;
	canvas.height = 1024;

	const context = canvas.getContext("2d");
	if (!context) {
		throw new Error("The browser could not create the country-border canvas.");
	}

	context.strokeStyle = "rgba(189, 226, 255, 0.68)";
	context.lineWidth = 1.35;
	context.lineJoin = "round";

	const drawRing = (ring) => {
		context.beginPath();
		let previousX = null;

		for (const [longitude, latitude] of ring) {
			const x = ((longitude + 180) / 360) * canvas.width;
			const y = ((90 - latitude) / 180) * canvas.height;

			if (previousX !== null && Math.abs(x - previousX) > canvas.width / 2) {
				context.stroke();
				context.beginPath();
			}

			if (previousX === null || Math.abs(x - previousX) > canvas.width / 2) {
				context.moveTo(x, y);
			} else {
				context.lineTo(x, y);
			}

			previousX = x;
		}

		context.stroke();
	};

	for (const feature of geoJson.features) {
		const { type, coordinates } = feature.geometry;

		if (type === "Polygon") {
			coordinates.forEach(drawRing);
		} else if (type === "MultiPolygon") {
			coordinates.flat().forEach(drawRing);
		}
	}

	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 4;
	return texture;
}

function createStars() {
	const positions = new Float32Array(1800 * 3);

	for (let index = 0; index < positions.length; index += 3) {
		positions[index] = (Math.random() - 0.5) * 42;
		positions[index + 1] = (Math.random() - 0.5) * 28;
		positions[index + 2] = -5 - Math.random() * 28;
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

	return new THREE.Points(
		geometry,
		new THREE.PointsMaterial({
			color: "#c9e5ff",
			size: 0.035,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
			depthWrite: false,
		}),
	);
}

function createAtmosphere() {
	return new THREE.Mesh(
		new THREE.SphereGeometry(1.53, 64, 64),
		new THREE.ShaderMaterial({
			vertexShader: `
				varying vec3 vNormal;
				varying vec3 vViewPosition;

				void main() {
					vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
					vNormal = normalize(normalMatrix * normal);
					vViewPosition = -viewPosition.xyz;
					gl_Position = projectionMatrix * viewPosition;
				}
			`,
			fragmentShader: `
				varying vec3 vNormal;
				varying vec3 vViewPosition;

				void main() {
					float rim = 1.0 - max(dot(normalize(vNormal), normalize(vViewPosition)), 0.0);
					float glow = pow(rim, 2.4);
					gl_FragColor = vec4(0.15, 0.52, 1.0, glow * 0.62);
				}
			`,
			blending: THREE.AdditiveBlending,
			transparent: true,
			depthWrite: false,
			side: THREE.FrontSide,
		}),
	);
}

export default function Earth() {
	const mountRef = useRef(null);
	const [loadError, setLoadError] = useState("");

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return undefined;

		let disposed = false;
		let frameId = 0;
		let resizeObserver;
		let renderer;
		let scene;
		let planetGroup;
		let dragStartX = null;
		let dragStartY = null;
		let dragPointerId = null;
		const timer = new THREE.Timer();

		const loadEarth = async () => {
			let earthTexture;

			try {
				const textureLoader = new THREE.TextureLoader();
				const [loadedTexture, countriesResponse] = await Promise.all([
					new Promise((resolve, reject) => {
						textureLoader.load(
							`${import.meta.env.BASE_URL}textures/earth.jpg`,
							resolve,
							undefined,
							reject,
						);
					}),
					fetch(`${import.meta.env.BASE_URL}data/countries.geojson`),
				]);

				earthTexture = loadedTexture;
				if (!countriesResponse.ok) {
					throw new Error(`Country boundaries failed to load (${countriesResponse.status}).`);
				}

				const geoJson = await countriesResponse.json();
				if (disposed) {
					earthTexture.dispose();
					return;
				}

				earthTexture.colorSpace = THREE.SRGBColorSpace;
				earthTexture.anisotropy = 8;

				const countryTexture = createCountryTexture(geoJson);
				scene = new THREE.Scene();
				scene.background = new THREE.Color("#030713");

				const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
				camera.position.set(0, 0, 6.1);

				renderer = new THREE.WebGLRenderer({
					antialias: true,
					alpha: false,
					powerPreference: "high-performance",
				});
				renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
				renderer.setSize(mount.clientWidth, mount.clientHeight);
				renderer.outputColorSpace = THREE.SRGBColorSpace;
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1.12;
				renderer.domElement.setAttribute("aria-label", "Rotating 3D Earth with country borders");
				renderer.domElement.setAttribute("role", "img");
				mount.appendChild(renderer.domElement);

				scene.add(new THREE.AmbientLight("#a8c8ff", 1.15));

				const sunlight = new THREE.DirectionalLight("#fff0d8", 3.2);
				sunlight.position.set(-4, 2.5, 5);
				scene.add(sunlight);

				planetGroup = new THREE.Group();
				scene.add(planetGroup);

				const earth = new THREE.Mesh(
					new THREE.SphereGeometry(1.5, 96, 96),
					new THREE.MeshStandardMaterial({
						map: earthTexture,
						roughness: 0.92,
						metalness: 0.02,
					}),
				);
				planetGroup.add(earth);

				const countryLines = new THREE.Mesh(
					new THREE.SphereGeometry(1.506, 96, 96),
					new THREE.MeshBasicMaterial({
						map: countryTexture,
						transparent: true,
						depthWrite: false,
					}),
				);
				planetGroup.add(countryLines);
				planetGroup.add(createAtmosphere());

				const orbit = new THREE.Mesh(
					new THREE.TorusGeometry(1.92, 0.004, 8, 220),
					new THREE.MeshBasicMaterial({
						color: "#49aaff",
						transparent: true,
						opacity: 0.24,
					}),
				);
				orbit.rotation.set(1.13, 0.12, -0.24);
				scene.add(orbit);
				scene.add(createStars());

				const resize = () => {
					if (!renderer || !mount.clientWidth || !mount.clientHeight) return;
					camera.aspect = mount.clientWidth / mount.clientHeight;
					camera.updateProjectionMatrix();
					renderer.setSize(mount.clientWidth, mount.clientHeight);
				};

				const canvas = renderer.domElement;
				const onPointerDown = (event) => {
					dragStartX = event.clientX;
					dragStartY = event.clientY;
					dragPointerId = event.pointerId;
					canvas.setPointerCapture(event.pointerId);
					canvas.classList.add("is-dragging");
				};
				const onPointerMove = (event) => {
					if (dragPointerId !== event.pointerId || !planetGroup) return;
					planetGroup.rotation.y += (event.clientX - dragStartX) * 0.006;
					planetGroup.rotation.x = THREE.MathUtils.clamp(
						planetGroup.rotation.x + (event.clientY - dragStartY) * 0.004,
						-0.45,
						0.45,
					);
					dragStartX = event.clientX;
					dragStartY = event.clientY;
				};
				const onPointerUp = (event) => {
					if (dragPointerId !== event.pointerId) return;
					dragPointerId = null;
					canvas.classList.remove("is-dragging");
					if (canvas.hasPointerCapture(event.pointerId)) {
						canvas.releasePointerCapture(event.pointerId);
					}
				};

				canvas.addEventListener("pointerdown", onPointerDown);
				canvas.addEventListener("pointermove", onPointerMove);
				canvas.addEventListener("pointerup", onPointerUp);
				canvas.addEventListener("pointercancel", onPointerUp);

				resizeObserver = new ResizeObserver(resize);
				resizeObserver.observe(mount);
				resize();

				const animate = () => {
					if (disposed) return;
					timer.update();
					const delta = timer.getDelta();
					if (dragPointerId === null) {
						planetGroup.rotation.y += delta * 0.12;
					}
					renderer.render(scene, camera);
					frameId = window.requestAnimationFrame(animate);
				};

				animate();
			} catch (error) {
				earthTexture?.dispose();
				if (!disposed) {
					console.error("Unable to render the Earth globe:", error);
					setLoadError("The globe could not load. Check the local Earth texture and country data files.");
				}
			}
		};

		loadEarth();

		return () => {
			disposed = true;
			window.cancelAnimationFrame(frameId);
			resizeObserver?.disconnect();

			if (scene) {
				scene.traverse((object) => {
					if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
						object.geometry.dispose();
						const materials = Array.isArray(object.material) ? object.material : [object.material];
						materials.forEach((material) => {
							material.map?.dispose();
							material.dispose();
						});
					}
				});
			}

			renderer?.dispose();
			if (renderer?.domElement.parentNode === mount) {
				mount.removeChild(renderer.domElement);
			}
		};
	}, []);

	return (
		<section className="earth-scene" aria-label="A realistic rotating Earth with country borders">
			<div className="earth-canvas" ref={mountRef} />
			<div className="earth-vignette" />
			<div className="earth-index">EARTH · 01 <span>LIVE VIEW</span></div>
			<div className="earth-copy">
				<p className="earth-kicker"><span /></p>
				
			</div>
			MADE BY:
			<div className="earth-coordinate"  style={{ fontWeight: "bold", fontSize: "20px" }}>SuϻɪƬ Yᴀᴅᴀꪜ</div>
			{loadError && <p className="earth-error" role="alert">{loadError}</p>}
		</section>
	);
}
