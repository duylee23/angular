import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-three-scene',
  imports: [],
  templateUrl: './three-scene.component.html',
  styleUrl: './three-scene.component.css'
})
export class ThreeSceneComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private light!: THREE.DirectionalLight;
  private ambientLight!: THREE.AmbientLight;

  constructor() { }

  ngOnInit(): void {
    this.initThreeJS();
  }

  ngOnDestroy(): void {
    this.dispose();
  }

  private initThreeJS(): void {
    // Create the scene
    this.scene = new THREE.Scene();

    // Set up camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Create the renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Add a beautiful rotating cube
    const geometry = new THREE.BoxGeometry(2, 2, 2); // Cube size
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x00ff00, 
      emissive: 0x444444, 
      shininess: 100 
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // Add a background
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load('assets/textures/stars.jpg');  // Path to a beautiful background texture
    this.scene.background = backgroundTexture;

    // Add lighting effects
    this.ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    this.scene.add(this.ambientLight);

    this.light = new THREE.DirectionalLight(0xffffff, 1); // Strong directional light
    this.light.position.set(5, 5, 5).normalize();
    this.scene.add(this.light);

    // Start animation
    this.animate();
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    // Animate the cube
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // Update the renderer
    this.renderer.render(this.scene, this.camera);
  }

  private dispose(): void {
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}