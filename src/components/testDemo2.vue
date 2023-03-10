<!--
 * @Author: Leo
 * @Date: 2023-03-09 15:24:52
 * @LastEditors: Leo
 * @LastEditTime: 2023-03-10 14:34:40
 * @FilePath: \babylonJS\src\components\testDemo2.vue
 * @Description: 
 * 
-->

<template>
    <div>
        <canvas id="renderCanvas" ref="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
    Engine,
    Scene,
    FreeCamera,
    Vector3,
    MeshBuilder,
    ArcRotateCamera,
    PointLight,
    StandardMaterial,
    Color3,
    HemisphericLight,
    SpotLight,
    ActionManager,
    InterpolateValueAction,
    HighlightLayer,
    PointerEventTypes,
    Matrix
} from "@babylonjs/core";
import { create } from "domain";

onMounted(() => {
    console.log(`the component is now mounted.`);
    initCanvas();
});

function initCanvas() {
    const canvas = document.getElementById("renderCanvas");
    if (canvas) {
        const engine = new Engine(canvas, true);
        engine.enableOfflineSupport = false;
        // 创建场景
        const createScene = () => {
            // 实例化场景
            const scene = new Scene(engine);
            // 创建相机并添加到canvas
            const camera = new ArcRotateCamera(
                'Camera',
                Math.PI / 2,
                Math.PI / 2,
                2,
                new Vector3(0, 0, 5),
                scene
            );
            camera.attachControl(canvas, true);
            // 添加光源
            // 环境光
            const light1 = new HemisphericLight(
                "light1",
                new Vector3(1, 2, 1),
                scene
            );

            // 聚光灯
            // const light2 = new SpotLight(
            //     "light2",
            //     new Vector3(0,3,1),
            //     new Vector3(0,-1,0),
            //     Math.PI / 5, 
            //     2,
            //     scene
            // )

            // 点光源
            // const light3 = new PointLight(
            //     "light3",
            //     new Vector3(0,2,1),
            //     scene
            // );

            const skybox = MeshBuilder.CreateBox(
                'skybox',
                {
                    height: 0.25,
                    width: 2,
                    depth: 2,
                },
                scene
            );

            const skybox2 = MeshBuilder.CreateBox(
                'skybox2',
                {
                    height: 0.25,
                    width: 2,
                    depth: 2,
                },
                scene
            );

            const skybox3 = MeshBuilder.CreateBox(
                'skybox3',
                {
                    height: 0.25,
                    width: 2,
                    depth: 2,
                },
                scene
            );

            // 返回已存在的字符串对应名的变量
            function strToVar(str: string) {
                let name = str;
                return eval(name);
            };

            // 平面一
            skybox.position = new Vector3(0, 1, 1);
            skybox.actionManager = new ActionManager(scene);
            var highlightMaterial = new StandardMaterial("highlightMaterial", scene);
            highlightMaterial.emissiveColor = Color3.Green();
            skybox.material = highlightMaterial;
            // 平面二
            skybox2.position = new Vector3(0, 0, 1);
            skybox2.actionManager = new ActionManager(scene);
            var highlightMaterial2 = new StandardMaterial("highlightMaterial", scene);
            highlightMaterial2.emissiveColor = Color3.Red();
            skybox2.material = highlightMaterial2;
            // 平面三
            skybox3.position = new Vector3(0, -1, 1);
            skybox3.actionManager = new ActionManager(scene);
            var highlightMaterial3 = new StandardMaterial("highlightMaterial", scene);
            highlightMaterial3.emissiveColor = Color3.Yellow();
            skybox3.material = highlightMaterial3;

            let highlightPass = new HighlightLayer("highlightPass", scene);
            // 鼠标移入事件
            scene.onPointerObservable.add(function (e) {
                if (e.pickInfo?.pickedMesh) {
                    console.log('e=', e)
                    let boxName = e.pickInfo.pickedMesh.name;
                    let name = strToVar(boxName);
                    // let box = (boxName === 'skybox' ? skybox : boxName === 'skybox2' ? skybox2 : skybox3);
                    // 创建轮廓光
                    highlightPass.addMesh(name, Color3.White());
                } else {
                    // highlightPass.removeMesh(skybox);
                    highlightPass.removeAllMeshes();
                };
            }, PointerEventTypes.POINTERMOVE)

            // 物体点击事件
            scene.onPointerObservable.add(function (e) {
                if (e?.pickInfo?.hit === true) {
                    let name = e.pickInfo.pickedMesh?.name;
                    console.log('点击了', name);
                    window.alert(`点击了${name}`)
                }
            }, PointerEventTypes.POINTERTAP);


            engine.runRenderLoop(function () {
                scene.render();
            });
            return scene;
        };
        // 结束创建场景
        const scene = createScene();
        // loop
        engine.runRenderLoop(function () {
            scene.render();
        });
        // resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    }
}



</script>

<style scoped>
#renderCanvas {
    width: 600px;
    height: 600px;
}
</style>