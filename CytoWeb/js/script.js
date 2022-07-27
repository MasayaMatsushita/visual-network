var CytLayout = (function () {
    var _setLayout = function (cy, layoutName) {
      var layout = {
        name: layoutName,
        fit: true,
        animate: true
      };
      cy.layout(layout).run();   
      return layout;
    };
    return {
      setLeyout: _setLayout
    };
  })();
  document.addEventListener("DOMContentLoaded", function () {
    var setStyles = function (nodes, edges) {
      // ノードのスタイル
      nodes.forEach(function (node) {
        var data = node.json().data;
          // ノードのサイズとスタイル
          /*
                      // ノードのサイズをランダムで求めていますが、普通はノードの属性から値を取ると思います。
                      var width = [30, 70, 110];
                      var size = width[Math.floor(Math.random() * 3)];
                      node.css("width", size);
                      node.css("height", size);
          */
          // ラベルの幅と高さのサイズにします。
          node.css("width", "label");
          node.css("height", "label");
          node.css("padding", "10px");
          node.css("content", data.name || data.id);
          node.css("text-justification", "left")
          node.css("text-valign", "center");
          node.css("text-halign", "center");
          node.css("text-wrap", "wrap");
          if(data.isSubject){
            //主語の場合のノード描画
            node.css("shape", "ellipse");
            node.css("background-color", "#f582ae");
          }else{
            //主語以外のノード描画
            node.css("shape", "round-rectangle");
            node.css("background-color", "#8bd3dd");
          }
      });
      // エッヂのスタイル
      edges.forEach(function (edge) {
        var data = edge.json().data;
        edge.css("content", data.id);
        edge.css("curve-style", "taxi");
        // edge.css("target-arrow-shape", "triangle");
      });
    };
    var cy = cytoscape({
      container: $("#IdCytoscape"),
      ready: function () {
        setStyles(this.nodes(), this.edges());
      },
      elements: eval($("#IdElements").val()),
    });
    // パン、ズームイン／ズームアウトコントロールの配置
    cy.panzoom({});
    CytLayout.setLeyout(cy, $("#IdLayout").val());
    // cyのセレクタ"node"でイベントを拾う
    cy.on("cxttap", "node", function (evt) {
      var tgt = evt.target;
      var data = tgt.json().data;
      var id = data["id"];
      var m = "";
      m += "ノードの右クリックイベント";
      m += "{id:" + id + ", x:" + tgt.position("x") + ", y:" + tgt.position("y") + "}";
      alert(m);
    });
    // // cy要素自体でイベントを拾う
    // cy.on("tap", function (evt) {
    //   var tgt = evt.target;
    //   if (tgt === cy) {
    //     // cyをtapした場合は、ノードを追加
    //     cy.add({
    //       data: { id: 'new' + Math.round(Math.random() * 100) },
    //       position: {
    //         x: evt.position.x,
    //         y: evt.position.y
    //       }
    //     });
    //   } else {
    //   }
    //   setStyles(cy.nodes(), cy.edges());
    //   CytLayout.setLeyout(cy, $("#IdLayout").val());
    // });
    $("#IdLayout").change(function () {
      CytLayout.setLeyout(cy, $("#IdLayout").val());
    });
    $("#IdBtnRead").click(function () {
      var elements = cy.elements();
      cy.remove(elements);
      cy.add(eval($("#IdElements").val()));
      setStyles(cy.nodes(), cy.edges());
      CytLayout.setLeyout(cy, $("#IdLayout").val());
    });
    $("#IdBtnSave").click(function () {
      var s = "";
      var nodes = cy.nodes();
      nodes.forEach(function (node) {
        s += JSON.stringify(node.json());
        s += "\n";
      });
      $("#IdElementsPosition").val(s);
    });
  });