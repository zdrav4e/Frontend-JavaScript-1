define(function() {
  function Wall(leftX, rightX, topY, bottomY) {
    var leftX = leftX,
        rightX = rightX,
        topY = topY,
        bottomY = bottomY;

    this.getXY = function() {
      return {
        "leftX" : leftX,
        "rightX" : rightX,
        "topY" : topY,
        "bottomY" : bottomY
      };
    }
  }

  return Wall;
});
