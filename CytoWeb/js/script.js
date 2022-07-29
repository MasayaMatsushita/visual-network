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
          // ラベルの幅と高さのサイズにします。
          node.css("width", "label");
          node.css("height", "label");
          node.css("padding", "10px");
          node.css("content", data.name);
          node.css("text-justification", "left");
          node.css("text-valign", "center");
          node.css("text-halign", "center");
          node.css("text-wrap", "wrap");
          if(data.group == 1){
            //主語の場合のノード描画
            node.css("shape", "ellipse");
            node.css("background-color", "#ffd803");
          }else if(data.group == 2){
            //主語以外のノード描画
            node.css("shape", "round-rectangle");
            node.css("background-color", "#e3f6f5");
          }
      });
      // エッヂのスタイル
      edges.forEach(function (edge) {
        var data = edge.json().data;
        edge.css("content", data.name);
        edge.css("curve-style", "straight");
        edge.css("width", data.weight);
        edge.css("target-arrow-shape", "triangle");
        edge.css("target-arrow-color", "#005");
        edge.css("line-color", "#a00");
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
      m += "{id:" + id + ", x:" + tgt.position("x") + ", y:" + tgt.position("y") + "}";
      alert(m);
    });
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
  });