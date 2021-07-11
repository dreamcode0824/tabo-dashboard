const DEBUG = false;
const heightWidth = { x: "w", y: "h" };
/**
 * Get a layout item by ID. Used so we can override later on if necessary.
 *
 * @param  {Array}  layout Layout array.
 * @param  {String} id     ID
 * @return {LayoutItem}    Item at ID.
 */
export function getElementItem(elements, id) {
  return elements.find(element => {
    return element.id == id
  })
}
/**
 * Returns the first item this layout collides with.
 * It doesn't appear to matter which order we approach this from, although
 * perhaps that is the wrong thing to do.
 *
 * @param  {Object} layoutItem Layout item.
 * @return {Object|undefined}  A colliding layout item, or undefined.
 */
export function getFirstCollision(
  elements,
  element
) {
  return elements.find(item => {
    return collides(item, element)
  })
}
export function getAllCollisions(
  elements,
  element
) {
  return elements.filter(l => collides(l, element));
}
/**
 * Given two elements, check if they collide.
 */
/**
 * Helper function to determine whether there is an intersection between the two polygons described
 * by the lists of vertices. Uses the Separating Axis Theorem
 *
 * @param a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @param b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @return true if there is any intersection between the 2 polygons, false otherwise
 */
export function doPolygonsIntersect(a, b) {
  var polygons = [a, b];
  var minA, maxA, projected, i, i1, j, minB, maxB;

  for (i = 0; i < polygons.length; i++) {

    // for each polygon, look at each edge of the polygon, and determine if it separates
    // the two shapes
    var polygon = polygons[i];
    for (i1 = 0; i1 < polygon.length; i1++) {

      // grab 2 vertices to create an edge
      var i2 = (i1 + 1) % polygon.length;
      var p1 = polygon[i1];
      var p2 = polygon[i2];
      // find the line perpendicular to this edge
      var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

      minA = maxA = undefined;
      // for each vertex in the first shape, project it onto the line perpendicular to the edge
      // and keep track of the min and max of these values
      for (j = 0; j < a.length; j++) {
        projected = normal.x * a[j].x + normal.y * a[j].y;
        if (isUndefined(minA) || projected < minA) {
          minA = projected;
        }
        if (isUndefined(maxA) || projected > maxA) {
          maxA = projected;
        }
      }

      // for each vertex in the second shape, project it onto the line perpendicular to the edge
      // and keep track of the min and max of these values
      minB = maxB = undefined;
      for (j = 0; j < b.length; j++) {
        projected = normal.x * b[j].x + normal.y * b[j].y;
        if (isUndefined(minB) || projected < minB) {
          minB = projected;
        }
        if (isUndefined(maxB) || projected > maxB) {
          maxB = projected;
        }
      }

      // if there is no overlap between the projects, the edge we are looking at separates the two
      // polygons, and we know there is no overlap
      if (maxA < minB || maxB < minA) {
        // console.log("polygons don't intersect!");
        return false;
      }
    }
  }
  return true;
};
export const isUndefined = (value) => {
  return value === undefined;
}
export const rotatedElement = (elementWidth, elementHeight, rotate) => {
  let rate = 1;
  let width1 = rate * elementWidth * Math.cos(rotate * Math.PI / 180);
  let width2 = rate * elementHeight * Math.sin(rotate * Math.PI / 180);
  let height1 = rate * elementWidth * Math.sin(rotate * Math.PI / 180);
  let height2 = rate * elementHeight * Math.cos(rotate * Math.PI / 180);
  return [Math.abs(width1), Math.abs(width2), Math.abs(height1), Math.abs(height2)]
}
export const absRotatedElement = (elementWidth, elementHeight, rotate) => {
  let rate = 1;
  let width1 = rate * elementWidth * Math.cos(rotate * Math.PI / 180);
  let width2 = rate * elementHeight * Math.sin(rotate * Math.PI / 180);
  let height1 = rate * elementWidth * Math.sin(rotate * Math.PI / 180);
  let height2 = rate * elementHeight * Math.cos(rotate * Math.PI / 180);
  return [width1, width2, height1, height2]
}
export function collides(l1, l2) {
  let elementPadding;
  if (l1.r != 0 || l2.r != 0) {
    if (l1.id === l2.id) {
      return false;
    } // same element
    else {
      // console.log(l1, l2)
      const widthHeight1 = absRotatedElement(l1.w, l1.h, l1.r);
      const widthHeight2 = absRotatedElement(l2.w, l2.h, l2.r);
      const result = doPolygonsIntersect([
        { x: l1.x, y: l1.y },
        { x: l1.x + widthHeight1[0], y: l1.y + widthHeight1[2] },
        { x: l1.x + widthHeight1[0] - widthHeight1[1], y: l1.y + widthHeight1[2] + widthHeight1[3] },
        { x: l1.x - widthHeight1[1], y: l1.y + widthHeight1[3] },
      ],
        [
          { x: l2.x, y: l2.y },
          { x: l2.x + widthHeight2[0], y: l2.y + widthHeight2[2] },
          { x: l2.x + widthHeight2[0] - widthHeight2[1], y: l2.y + widthHeight2[2] + widthHeight2[3] },
          { x: l2.x - widthHeight2[1], y: l2.y + widthHeight2[3] },
        ])
      return result
    }
  } else {
    elementPadding = 0;
    if (l1.id === l2.id) return false; // same element
    if (l1.x + l1.w + elementPadding <= l2.x) return false; // l1 is left of l2
    if (l1.x >= l2.x + l2.w + elementPadding) return false; // l1 is right of l2
    if (l1.y + l1.h + elementPadding <= l2.y) return false; // l1 is above l2
    if (l1.y >= l2.y + l2.h + elementPadding) return false; // l1 is below l2
    return true; // boxes overlap
  }
}
/**
 * Move an element. Responsible for doing cascading movements of other elements.
 *
 * Modifies layout items.
 *
 * @param  {Array}      elements            Full layout to modify.
 * @param  {LayoutItem} element                 element to move.
 * @param  {Number}     [x]               X position in grid units.
 * @param  {Number}     [y]               Y position in grid units.
 */
export function moveElement(
  elements,
  element,
  x,
  y,
  isUserAction,
  preventCollision,
  compactType,
  cols,
  zoomRate
) {
  // console.log(elements, element, x, y, preventCollision)
  // If this is static and not explicitly enabled as draggable,
  // no move is possible, so we can short-circuit this immediately.


  // console.log(elements, element, x, y, isUserAction, preventCollision, compactType, cols)
  if (element.static && element.isDraggable !== true) return elements;

  // Short-circuit if nothing to do.
  if (element.y === y && element.x === x) return elements;

  log(
    `Moving element ${element.elementId} to [${String(x)},${String(y)}] from [${element.x},${element.y}]`
  );
  const oldX = element.x;
  const oldY = element.y;

  // This is quite a bit faster than extending the object
  if (typeof x === "number") element.x = x;
  if (typeof y === "number") element.y = y;
  element.moved = true;

  // If this collides with anything, move it.
  // When doing this comparison, we have to sort the items we compare with
  // to ensure, in the case of multiple collisions, that we're getting the
  // nearest collision.
  let sorted = sortLayoutItems(elements, compactType);
  // console.log(sorted)
  const movingUp =
    compactType === "vertical" && typeof y === "number"
      ? oldY >= y
      : compactType === "horizontal" && typeof x === "number"
        ? oldX >= x
        : false;
  // $FlowIgnore acceptable modification of read-only array as it was recently cloned
  if (movingUp) sorted = sorted.reverse();
  const collisions = getAllCollisions(sorted, element);

  // There was a collision; abort
  if (preventCollision && collisions.length) {
    log(`Collision prevented on ${element.elementId}, reverting.`);
    element.x = oldX;
    element.y = oldY;
    element.moved = false;
  }
  return elements;
}
/**
 * This is where the magic needs to happen - given a collision, move an element away from the collision.
 * We attempt to move it up if there's room, otherwise it goes below.
 *
 * @param  {Array} elements            Full elements to modify.
 * @param  {LayoutItem} collidesWith Layout item we're colliding with.
 * @param  {LayoutItem} itemToMove   Layout item we're moving.
 */
export function moveElementAwayFromCollision(
  elements,
  collidesWith,
  itemToMove,
  isUserAction,
  compactType,
  cols
) {
  const compactH = compactType === "horizontal";
  // Compact vertically if not set to horizontal
  const compactV = compactType !== "horizontal";
  const preventCollision = collidesWith.static; // we're already colliding (not for static items)
  // If there is enough space above the collision to put this element, move it there.
  // We only do this on the main collision as this can get funky in cascades and cause
  // unwanted swapping behavior.
  if (isUserAction) {
    // Reset isUserAction flag because we're not in the main collision anymore.
    isUserAction = false;
    // Make a mock item so we don't modify the item here, only modify in moveElement.
    const fakeItem = {
      x: compactH ? Math.max(collidesWith.x - itemToMove.w, 0) : itemToMove.x,
      y: compactV ? Math.max(collidesWith.y - itemToMove.h, 0) : itemToMove.y,
      w: itemToMove.w,
      h: itemToMove.h,
      i: "-1"
    };
    // No collision? If so, we can go up there; otherwise, we'll end up moving down as normal
    if (!getFirstCollision(elements, fakeItem)) {
      log(
        `Doing reverse collision on ${itemToMove.elementId} up to [${fakeItem.x},${fakeItem.y}].`
      );
      return moveElement(
        elements,
        itemToMove,
        compactH ? fakeItem.x : undefined,
        compactV ? fakeItem.y : undefined,
        isUserAction,
        preventCollision,
        compactType,
        cols
      );
    }
  }

  return moveElement(
    elements,
    itemToMove,
    compactH ? itemToMove.x + 1 : undefined,
    compactV ? itemToMove.y + 1 : undefined,
    isUserAction,
    preventCollision,
    compactType,
    cols
  );
}
export function findNewElementPosition(elements, storeElements, position, dragElementId, movedElementNumber, elementPaddingWidth, elementRotate, elementPaddingHeight, elementArrangeType) {
  const newElement = {
    src: `/element/${dragElementId}.png`,
    elementId: dragElementId,
    x: "",
    y: "",
    w: "",
    h: "",
    r: 0,
    static: false,
    moved: false
  }
  const storeElement = storeElements.find((ele) => {
    return ele.id == dragElementId
  })
  newElement.w = storeElement.width / 2.5;
  newElement.h = storeElement.height / 2.5;
  if (elements.length == 0) {
    newElement.x = 10;
    newElement.y = 10;
    newElement.number = 0;
    newElement.id = "i0";
  } else {
    // console.log(elementPaddingWidth)
    const compactType = "horizontal";// | "vertical"
    const preventCollision = true;
    const isUserAction = true;
    const cols = 20;
    const lastElement = elements[elements.length - 1];
    const widthHeight1 = rotatedElement(lastElement.w, lastElement.h, lastElement.r);
    const oldX = Math.round(lastElement.x + widthHeight1[0] + widthHeight1[1] + elementPaddingWidth);
    const oldY = Math.round(lastElement.y);
    const resultElement = getElementItem(elements, movedElementNumber)
    if (resultElement) {
      if (resultElement.r == 0) {
        newElement.x = resultElement.x + resultElement.w + elementPaddingWidth;
        if (elementArrangeType == "horizontal") {
          newElement.y = Math.round(resultElement.y);
        } else {
          newElement.y = resultElement.y;
        }
      }
      else {
        const widthHeight1 = rotatedElement(resultElement.w, resultElement.h, resultElement.r);
        // console.log(elementPaddingWidth, "------------->elementPaddingWidth")
        // if (elementArrangeType == "horizontal") {
        // if (resultElement.r == 90) {
        //   console.log("90--------->")
        //   newElement.x = resultElement.x - resultElement.w + 10;
        //   newElement.y = Math.round(resultElement.y);
        // } else {
        // console.log(resultElement)
        newElement.x = resultElement.x + widthHeight1[0] + widthHeight1[1] + elementPaddingWidth;
        newElement.y = Math.round(resultElement.y);
        // }
        // } else {
        //   newElement.x = resultElement.x + widthHeight1[0] + widthHeight1[1] + elementPaddingWidth;
        //   newElement.y = resultElement.y;
        // }
      }
      newElement.moved = true;
      newElement.number = elements.length;
      newElement.id = "i" + elements.length;
      newElement.r = elementRotate
    } else {
      // console.log("resultElement")
      newElement.x = Math.round(elements[elements.length - 1].x);
      newElement.y = Math.round(elements[elements.length - 1].y);
      newElement.moved = true;
      newElement.number = elements.length;
      newElement.id = "i" + elements.length;
    }
    // console.log(newElement)
    // If this collides with anything, move it.
    // When doing this comparison, we have to sort the items we compare with
    // to ensure, in the case of multiple collisions, that we're getting the
    // nearest collision.
    let sorted = sortLayoutItems(elements, compactType);
    const movingUp =
      compactType === "vertical" && typeof y === "number"
        ? oldY >= position.y
        : compactType === "horizontal" && typeof x === "number"
          ? oldX >= position.x
          : false;
    // $FlowIgnore acceptable modification of read-only array as it was recently cloned
    if (movingUp) sorted = sorted.reverse();
    const collisions = getAllCollisions(sorted, newElement);

    // There was a collision; abort
    if (preventCollision && collisions.length) {
      log(`Collision prevented on ${newElement.elementId}, reverting.`);
      const newPosition = getNewPoistion(elements, newElement, oldX, oldY, compactType, 0);
      newElement.x = newPosition[0];
      newElement.y = newPosition[1];
      newElement.moved = false;
      // console.log("collistion")
      return newElement;
    }
  }
  return newElement;
}
function getNewPoistion(elements, newElement, oldX, oldY, compactType, n) {
  const preventCollision = true;
  const i = n % 2;
  let exception = false;
  if (i === 0) {
    // newElement.y = oldY + 10 * n;
    newElement.x = oldX + 10 * n;
  } else {
    // newElement.y = oldY - 10 * n;
    // if(newElement.y<5){
    //   exception =true;
    // }
    newElement.x = oldX + 10 * n;
    if (newElement.x < 5) {
      exception = true;
    }
  }
  if (exception) {
    oldX = oldX + 10;
  }
  // console.log(n)
  if (n > 15) {
    return [oldX, oldY];
  }
  let sorted = sortLayoutItems(elements, compactType);
  const movingUp = false;
  // $FlowIgnore acceptable modification of read-only array as it was recently cloned
  if (movingUp) sorted = sorted.reverse();
  const collisions = getAllCollisions(sorted, newElement);

  // There was a collision; abort
  if (preventCollision && collisions.length) {
    n++;
    return getNewPoistion(elements, newElement, oldX, oldY, compactType, n);
  }
  return [newElement.x, newElement.y];
}
/**
 * Get layout items sorted from top left to right and down.
 *
 * @return {Array} Array of layout objects.
 * @return {Array}        Layout, sorted static items first.
 */
export function sortLayoutItems(
  layout,
  compactType
) {
  if (compactType === "horizontal") return sortLayoutItemsByColRow(layout);
  else return sortLayoutItemsByRowCol(layout);
}

/**
 * Sort layout items by row ascending and column ascending.
 *
 * Does not modify Layout.
 */
export function sortLayoutItemsByRowCol(layout) {
  // Slice to clone array as sort modifies
  return layout.slice(0).sort(function (a, b) {
    if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
      return 1;
    } else if (a.y === b.y && a.x === b.x) {
      // Without this, we can get different sort results in IE vs. Chrome/FF
      return 0;
    }
    return -1;
  });
}
/**
 * Sort layout items by column ascending then row ascending.
 *
 * Does not modify Layout.
 */
export function sortLayoutItemsByColRow(layout) {
  return layout.slice(0).sort(function (a, b) {
    if (a.x > b.x || (a.x === b.x && a.y > b.y)) {
      return 1;
    }
    return -1;
  });
}
/**
 * Before moving item down, it will check if the movement will cause collisions and move those items down before.
 */
function resolveCompactionCollision(
  elements,//: Layout,
  item,//: LayoutItem,
  moveToCoord,//: number,
  axis//: "x" | "y"
) {
  const sizeProp = heightWidth[axis];
  item[axis] += 1;
  const itemIndex = elements
    .map(layoutItem => {
      return layoutItem.elementId;
    })
    .indexOf(item.elementId);

  // Go through each item we collide with.
  for (let i = itemIndex + 1; i < elements.length; i++) {
    const otherItem = elements[i];
    // Ignore static items
    if (otherItem.static) continue;

    // Optimization: we can break early if we know we're past this el
    // We can do this b/c it's a sorted elements
    if (otherItem.y > item.y + item.h) break;

    if (collides(item, otherItem)) {
      resolveCompactionCollision(
        elements,
        otherItem,
        moveToCoord + item[sizeProp],
        axis
      );
    }
  }

  item[axis] = moveToCoord;
}
/**
 * Compact an item in the layout.
 *
 * Modifies item.
 *
 */
export function compactItem(
  compareWith,//: Layout,
  l,//: LayoutItem,
  compactType,//: CompactType,
  cols,//: number,
  fullLayout,//: Layout
) {
  const compactV = compactType === "vertical";
  const compactH = compactType === "horizontal";
  if (compactV) {
    // Bottom 'y' possible is the bottom of the layout.
    // This allows you to do nice stuff like specify {y: Infinity}
    // This is here because the layout must be sorted in order to get the correct bottom `y`.
    l.y = Math.min(bottom(compareWith), l.y);
    // Move the element up as far as it can go without colliding.
    while (l.y > 0 && !getFirstCollision(compareWith, l)) {
      l.y--;
    }
  } else if (compactH) {
    l.y = Math.min(bottom(compareWith), l.y);
    // Move the element left as far as it can go without colliding.
    while (l.x > 0 && !getFirstCollision(compareWith, l)) {
      l.x--;
    }
  }

  // Move it down, and keep moving it down if it's colliding.
  let collides;
  while ((collides = getFirstCollision(compareWith, l))) {
    if (compactH) {
      resolveCompactionCollision(fullLayout, l, collides.x + collides.w, "x");
    } else {
      resolveCompactionCollision(fullLayout, l, collides.y + collides.h, "y");
    }
    // Since we can't grow without bounds horizontally, if we've overflown, let's move it down and try again.
    if (compactH && l.x + l.w > cols) {
      l.x = cols - l.w;
      l.y++;
    }
  }
  return l;
}
/**
 * Return the bottom coordinate of the layout.
 *
 * @param  {Array} layout Layout array.
 * @return {Number}       Bottom coordinate.
 */
export function bottom(layout) {
  let max = 0,
    bottomY;
  for (let i = 0, len = layout.length; i < len; i++) {
    bottomY = layout[i].y + layout[i].h;
    if (bottomY > max) max = bottomY;
  }
  return max;
}

function log(...args) {
  if (!DEBUG) return;
  // eslint-disable-next-line no-console
  console.log(...args);
}

//////////////////////////-------------getMoveElement------------------------------------>
export function getElementDistance(lastElements, elements, element) {
  // console.log(lastElements)
  const includeElements = elements.filter(ele => ((ele.id != element.id) && ((ele.y >= element.y && ele.y <= element.y + element.h) || (ele.y + ele.h >= element.y && ele.y + ele.h <= element.y + element.h))) && (ele.x < element.x))
  let elementPaddingWidth = 10;
  let elementPaddingHeight = 0;
  let elementRotate = 0;
  let elementArrangeType = "horizontal";
  if (lastElements.length > 0) {
    elementRotate = lastElements[lastElements.length - 1].r;
  }
  if (lastElements.length == 2) {
    const widthHeight1 = rotatedElement(lastElements[0].w, lastElements[0].h, lastElements[0].r);
    const widthHeight2 = rotatedElement(lastElements[1].w, lastElements[1].h, lastElements[1].r);
    const width1 = widthHeight1[0] + widthHeight1[1];
    const width2 = widthHeight2[0] + widthHeight2[1];
    const height1 = widthHeight1[2] + widthHeight1[3];
    const height2 = widthHeight2[2] + widthHeight2[3];
    if (lastElements[0].x > lastElements[1].x) {
      if (includeElements.length > 0) {
        elementPaddingWidth = lastElements[0].x - lastElements[1].x - width2;
      } else {
        elementPaddingWidth = 10;
      }
    } else {
      if (includeElements.length > 0) {
        elementPaddingWidth = lastElements[1].x - lastElements[0].x - width1;
      } else {
        elementPaddingWidth = 10;
      }
      // elementPaddingWidth = 10;
    }
    if (lastElements[0].y > lastElements[1].y) {
      elementPaddingHeight = lastElements[0].y - lastElements[1].y - height2;
    } else {
      elementPaddingHeight = lastElements[1].y - lastElements[0].y - height1;
    }
    console.log(elementPaddingWidth)
    if (lastElements[0].y == lastElements[1].y) {
      elementArrangeType = "horizontal"
    } else {
      elementArrangeType = "verical"
      // elementPaddingWidth = 10;
    }
    elementRotate = lastElements[lastElements.length - 1].r;
  }
  return [Math.round(elementPaddingWidth), elementRotate, Math.round(elementPaddingHeight), elementArrangeType]
}