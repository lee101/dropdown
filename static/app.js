var topZindex = 1;

interact('.draggable')
    .draggable({
        // enable inertial throwing
        // inertia: true,
        // keep the element within the area of it's parent
        // restrict: {
        //     restriction: "parent",
        //     endOnly: true,
        //     elementRect: {top: 0, left: 0, bottom: 1, right: 1}
        // },
        // enable autoScroll
        autoScroll: true,
        onstart: function(event) {
            var $target = $(event.target);
            $target.css('position', 'absolute');
            $target.css('z-index', topZindex++);

            var nextSibling = $target.next();
            if (nextSibling.length === 0 || !$(nextSibling[0]).hasClass('item-secondary')) {
                return;
            }
            var copyNode = nextSibling[0].cloneNode(true);
            nextSibling.after(copyNode);
            $(nextSibling).removeClass('item-secondary')

        },
        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            // var textEl = event.target.querySelector('p');
            //
            // textEl && (textEl.textContent =
            //     'moved a distance of '
            //     + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
            //     Math.pow(event.pageY - event.y0, 2) | 0))
            //         .toFixed(2) + 'px');
        }
    });

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;



//zoom


var scale = 1,
    scaleElement = document.getElementsByClassName('scalable'),
    resetTimeout;

interact(scaleElement)
  .gesturable({
    onstart: function (event) {
      // clearTimeout(resetTimeout);
      // event.target.classList.remove('reset');
    },
    onmove: function (event) {
      scale = scale * (1 + event.ds);

      event.target.style.webkitTransform =
      event.target.style.transform =
        'scale(' + scale + ')';

      dragMoveListener(event);
    },
    onend: function (event) {
      // resetTimeout = setTimeout(reset, 1000);
      // event.target.classList.add('reset');
    }
  })
  .draggable({ onmove: dragMoveListener });

function reset () {
  scale = 1;
  scaleElement.style.webkitTransform =
  scaleElement.style.transform =
    'scale(1)';
}


//rotate

var angle = 0;

interact('.rotateable').gesturable({
  onmove: function (event) {
    var arrow = document.getElementById('rotateable');

    angle += event.da;

    arrow.style.webkitTransform =
    arrow.style.transform =
      'rotate(' + angle + 'deg)';

    document.getElementById('angle-info').textContent =
      angle.toFixed(2) + '\u00b0';
  }
});


// trash


// enable draggables to be dropped into this
interact('.trash').dropzone({
  // only accept elements matching this CSS selector
  // accept: '#yes-drop',
  // Require a 75% element overlap for a drop to be possible
  // overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    // event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    // var draggableElement = event.relatedTarget,
    //     dropzoneElement = event.target;
    //
    // // feedback the possibility of a drop
    // dropzoneElement.classList.add('drop-target');
    // draggableElement.classList.add('can-drop');
    // draggableElement.textContent = 'Dragged in';
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    // event.target.classList.remove('drop-target');
    // event.relatedTarget.classList.remove('can-drop');
    // event.relatedTarget.textContent = 'Dragged out';
  },
  ondrop: function (event) {
    // event.relatedTarget.textContent = 'Dropped';
    $(event.relatedTarget).remove()

  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    // event.target.classList.remove('drop-active');
    // event.target.classList.remove('drop-target');
  }
});
