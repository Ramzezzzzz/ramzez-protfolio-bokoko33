import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {}
        
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };


        this.setModel();
        this.setAnimation();
        this.onMouseMove();

    }
 
    setModel(){
        this.actualRoom.children.forEach((child)=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            //console.log(child);

            if(child.name ==="Aquarium002"){
                console.log(child);
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = 0;
                child.children[0].material.color.set(0x279fdd);
                child.children[0].material.ior = 1;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;
            }
            if(child.name ==="Computer"){
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            if(child.name === "Mini_Floor002"){
                child.position.x = 9.17603;
                child.position.z = 0.105331
            }

//            if(
//                child.name === "Mailbox002" ||
//                child.name === "Lamp" ||
//                child.name === "FloorFirst" ||
//                child.name === "FloorSecond" ||
//                child.name === "FloorThird" ||
//                child.name === "Dirt" ||
//                child.name === "Flower1" ||
//                child.name === "Flower2"
//                ) {
//                child.scale.set(0, 0, 0);
//            }

            child.scale.set(0, 0, 0);
                if(child.name === "Cube")
                    {
                        //child.scale.set(1, 1, 1);     
                        child.position.set(0, 0, 0);
                        child.rotation.y = Math.PI / 4;         
                    }
                if(child.name === "Cube001")
                    {
                        //child.scale.set(1, 1, 1);     
                        child.position.set(-4, 0, 0);    
                        child.rotation.y = Math.PI / 4;          
                    }
                if(child.name === "Cube002")
                    {
                        //child.scale.set(1, 1, 1);     
                        child.position.set(4, 0, 0);     
                        child.rotation.y = Math.PI / 4;         
                    }                
                if(child.name === "Cube003")
                    {
                        //child.scale.set(1, 1, 1);     
                        child.position.set(-8, 0, 0);   
                        child.rotation.y = Math.PI / 4;           
                    } 
                if(child.name === "Cube004")
                    {
                        //child.scale.set(1, 1, 1);     
                        child.position.set(8, 0, 0);  
                        child.rotation.y = Math.PI / 4;            
                    }                
                if(child.name === "Cube005")
                    {
                        //child.scale.set(1, 1, 1);     
                        child.position.set(12, 0, 0);   
                        child.rotation.y = Math.PI / 4;           
                    }
                this.roomChildren[child.name.toLowerCase()] = child;

        });

        const width = 0.5;
        const height = 0.7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set( 7.91745, 5.4, 0.5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;
        this.actualRoom.add( rectLight )

        this.roomChildren["rectLight"] = rectLight;

        //const rectLightHelper = new RectAreaLightHelper( rectLight );
        //rectLight.add( rectLightHelper );


        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
    }
    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[1]);
        this.swim.play();
        console.log(this.room);
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
                this.lerp.target = this.rotation*0.1;
        });
    }

    resize(){}

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }

    
}