draggable('.parent', '.child');

function draggable(selector, childselector) {
  let target = document.querySelector(selector);
  if (!target.classList.contains('draggable')) {
    target.classList.add('draggable');
  }
  let items = target.querySelectorAll(childselector);
  let current = null;

  for (let item of items) {
    if (!item.classList.contains('draggable-item')) {
      item.classList.add('draggable-item');
    }

    item.draggable = true;

    item.ondragstart = () => {
      current = item;
      for (let i of items) {
        if (i != current) { i.classList.add('hint'); }
      }
    };

    item.ondragenter = () => {
      if (item != current) { item.classList.add('active'); }
    };

    item.ondragleave = () => {
      item.classList.remove('active');
    };

    item.ondragend = () => {
      for (let i of items) {
        i.classList.remove('hint');
        i.classList.remove('active');
      }
    };

    item.ondragover = (e) => { 
      e.preventDefault(); 
    };

    item.ondrop = (e) => {
      e.preventDefault();
      if (item != current) {
        let currentpos = 0, droppedpos = 0;
        for (let i = 0; i < items.length; i++) {
          if (current == items[i]) { currentpos = i; }
          if (item == items[i]) { droppedpos = i; }
        }
        if (currentpos < droppedpos) {
          item.parentNode.insertBefore(current, item.nextSibling);
        } else {
          item.parentNode.insertBefore(current, item);
        }
      }
      updateControlIndicies(target.querySelectorAll(childselector));
    };
  }
}
