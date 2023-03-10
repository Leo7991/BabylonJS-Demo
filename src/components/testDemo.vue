<!--
 * @description: 
 * @author: lijingru
 * @Date: 2023-03-01 14:24:21
 * @lastEditors: lijingru
 * @LastEditTime: 2023-03-10 14:06:00
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
  ActionManager,
  InterpolateValueAction,
  HighlightLayer,
  PointerEventTypes,
  Matrix
} from "@babylonjs/core";

// defineProps < {} > ()
onMounted(() => {
  console.log(`the component is now mounted.`);
  initCanvas();
});
function initCanvas() {
  const canvas = document.getElementById("renderCanvas");
  console.log(canvas);
  if (canvas) {
    const engine = new Engine(canvas, true);
    engine.enableOfflineSupport = false;
    /******* 创建场景 ******/
    const createScene = () => {
      // 实例化场景
      const scene = new Scene(engine);
      // 创建相机并添加到canvas
      const camera = new ArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI / 2,
        2,
        new Vector3(0, 0, 5),
        scene
      );
      camera.attachControl(canvas, true);
      // 添加光
      const light1 = new HemisphericLight(
        "light1",
        new Vector3(1, 1, 0),
        scene
      );
      const light2 = new PointLight("light2", new Vector3(0, 1, -1), scene);
      const hl = new HighlightLayer("hl1", scene);
      const skybox = MeshBuilder.CreateBox(
        "skyBox",
        {
          height: 0.5,
          width: 0.25,
          depth: 0.25,
        },
        scene
      );
      const skybox2 = MeshBuilder.CreateBox(
        "skyBox",
        {
          height: 0.5,
          width: 0.25,
          depth: 0.25,
        },
        scene
      );

      skybox.position = new Vector3(0, 2, 1);
      skybox2.position = new Vector3(0, 1, 1);
      let myPoints = [
        new Vector3(0, 2, 1),
        new Vector3(0, 1, 1),
        // new Vector3(0, 1, 0)
      ];
      var lines = MeshBuilder.CreateLines(
        "lines",
        {
          points: myPoints,
        },
        scene
      );
      skybox.actionManager = new ActionManager(scene);
      var highlightMaterial = new StandardMaterial("highlightMaterial", scene);
      highlightMaterial.emissiveColor = Color3.Yellow();

      skybox.material = highlightMaterial;
      let highlightPass = new HighlightLayer("highlightPass", scene);
      // 鼠标移入事件
      scene.onPointerObservable.add(function (e) {
        if (e.pickInfo?.pickedMesh) {
          // 创建轮廓光
          highlightPass.addMesh(skybox, Color3.White());
        } else {
          highlightPass.removeMesh(skybox);
        }
      }, PointerEventTypes.POINTERMOVE);
      // 鼠标点击事件
      // skybox.actionManager.registerAction(
      //       // this.showPopup(skybox);

      // );
      engine.runRenderLoop(function () {
        scene.render();
      });
      return scene;
    };
    /******* 结束创建场景 ******/
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
//  function showPopup(mesh) {
//             let position = Vector3.Project(mesh.position, Matrix.Identity(), this.scene.getTransformMatrix(), this.camera.viewport.toGlobal(this.engine.getRenderWidth(), this.engine.getRenderHeight()));
//             this.popup.position.x = position.x + this.$refs.canvas.getBoundingClientRect().left;
//             this.popup.position.y = position.y + this.$refs.canvas.getBoundingClientRect().top;
//             this.popup.content = "This is a popup for the box.";
//             this.popup.visible = true;
//         },
//  function  hidePopup() {
//             this.popup.visible = false;
//         }
</script>

<style scoped>
.read-the-docs {
  color: #888;
}

#renderCanvas {
  width: 600px;
  height: 600px;
}
</style>
