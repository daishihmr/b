(function() {

  var THREE_JS_URL = "https://cdn.rawgit.com/mrdoob/three.js/r73/build/three.min.js";
  var VOX_JS_URL = "https://cdn.rawgit.com/daishihmr/vox.js/1.0.1/build/vox.min.js";

  var marioMain = function() {
    Promise
      .all([loadScript(THREE_JS_URL), loadScript(VOX_JS_URL)])
      .then(function() {
        marioStart();
      });
  };

  var loadScript = function(src) {
    var script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    return new Promise(function(ok, ng) {
      script.onload = function() {
        ok();
      };
    });
  };

  var marioStart = function() {
    var marioX = window.innerWidth * 0.8;
    var marioY = -100;
    var marioDx = 0;
    var marioDy = 0;
    var marioRotY = 0;
    var VY = new THREE.Vector3(0, 1, 0);
    var pressLeft = false;
    var pressRight = false;

    var canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.left = ~~marioX + "px";
    canvas.style.top = ~~marioY + "px";
    canvas.style.backgroundColor = "rgba(0, 0, 0, 0)";
    document.body.appendChild(canvas);
    
    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 37) {
        pressLeft = true;
      } else if (e.keyCode === 39) {
        pressRight = true;
      }

      if (e.keyCode === 38) {
        if (window.innerHeight * 0.8 <= marioY) {
          marioDy = -30;
          marioY -= 1;
        }
      }
    });
    window.addEventListener("keyup", function(e) {
      if (e.keyCode === 37) {
        pressLeft = false;
      } else if (e.keyCode === 39) {
        pressRight = false;
      }
    });

    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setSize(80, 80);
    renderer.setClearColor(0x000000, 0);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(25, 1, 1, 1000);
    camera.position.y = 12;
    camera.position.z = 60;
    camera.lookAt(new THREE.Vector3(0, 12, 0));
    var dl = new THREE.DirectionalLight(0xffffff, 1.0);
    dl.position.set(0, 100, 100);
    scene.add(dl);
    var al = new THREE.AmbientLight(0x505050);
    scene.add(al);
    
    var mario = null;
    var parser = new vox.Parser();
    var data = DATA[~~(Math.random() * DATA.length)];
    parser.parse(data).then(function(data) {
      var builder = new vox.MeshBuilder(data);
      mario = builder.createMesh();
      scene.add(mario);
    });

    var f = 0;
    var render = function() {
      if (mario) {
        if (pressLeft) {
          marioDx = Math.max(marioDx - 2, -10);
        } else if (pressRight) {
          marioDx = Math.min(marioDx + 2, +10);
        }
        if (!pressLeft && !pressRight) {
          marioDx *= 0.9;
        }

        if (marioY < window.innerHeight * 0.8) {
          marioDy = Math.min(marioDy + 1, 30);
        } else {
          marioDy = 0;
          marioY = window.innerHeight * 0.8;
        }

        marioX += marioDx;
        marioY += marioDy;
        
        if (marioX < -80) marioX += (window.innerWidth + 80);
        if (window.innerWidth < marioX) marioX -= (window.innerWidth + 80);
        canvas.style.left = ~~marioX + "px";
        canvas.style.top = ~~marioY + "px";
        
        if (marioDx < 0) {
          marioRotY = Math.max(marioRotY -= 0.06, -1.0);
        } else if (0 < marioDx) {
          marioRotY = Math.min(marioRotY += 0.06, +1.0);
        }
        mario.rotation.y = marioRotY;
        
        mario.scale.y = 1.0 + Math.sin(f * 0.1) * 0.1;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(render);
      f += 1;
    };
    render();
  };

  var DATA = [
    "caspar.vox",
    "hakase.vox",
    "lagoon_rikka.vox",
    "p10.vox",
    "p10e.vox",
    "p11.vox",
    "p12.vox",
    "p13.vox",
    "p14.vox",
    "p15.vox",
    "p17.vox",
    "p18.vox",
    "p19.vox",
    "p19e.vox",
    "p20.vox",
    "p20e.vox",
    "p21.vox",
    "p22.vox",
    "p23.vox",
    "p24.vox",
    "p25.vox",
    "p26.vox",
    "p27.vox",
    "p28.vox",
    "p29.vox",
    "p30.vox",
    "p31.vox",
    "p32.vox",
    "p33.vox",
    "p34.vox",
    "p35.vox",
    "p36.vox",
    "p37.vox",
    "p38.vox",
    "p39.vox",
    "p40.vox",
    "p41.vox",
    "p42.vox",
    "p43.vox",
    "p44.vox",
    "p45.vox",
    "p46.vox",
    "p47.vox",
    "p48.vox",
    "p49.vox",
    "p50.vox",
    "p50e.vox",
    "p51.vox",
    "p6.vox",
    "p7.vox",
    "p8.vox",
    "p9.vox",
    "ranun.vox",
  ].map(function(it) {
    return "/b/marioscript/vox/" + it;
  });

  marioMain();

})();
