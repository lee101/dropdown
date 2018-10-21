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
        onstart: function (event) {
            var $target = $(event.target);
            var nextSibling = $target.next();
            if (nextSibling.length === 0) {
                console.log('should allways have a sibling :/')
            }
            var firstRun = $(nextSibling[0]).hasClass('item-secondary');
            if (firstRun) {
                //safari abs position bug
                $target.css('top', $target.offset().top + $target.parent().scrollTop())
                $target.css('left', $target.offset().left)

                var sidbarScroll = $('aside').scrollTop();
                $target.css('transform', 'translate(0px, -' + sidbarScroll + 'px)');
                // they dont use data attrs
                // $target.data('y', -sidbarScroll);
                $target[0].setAttribute('data-y', -sidbarScroll);


            }
            $target.css('position', 'absolute');
            $target.css('z-index', topZindex++);

            if (nextSibling.length === 0 || !firstRun) {
                return;
            }
            var copyNode = nextSibling[0].cloneNode(true);
            nextSibling.after(copyNode);
            $(nextSibling).removeClass('item-secondary');

            dragMoveListener(event)

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
    })
    .gesturable({
        onstart: function (event) {
            // clearTimeout(resetTimeout);
            // event.target.classList.remove('reset');
        },
        onmove: function (event) {
            var $target = $(event.target);
            var scale = $target.data('scale') || 1;


            var scale = scale * (1 + (event.ds / 5));
            $target.data('scale', scale);

            setScale(event.target,'scale(' + scale + ')')

            var angle = $target.data('angle') || 0;
            angle += event.da / 2;
            $target.data('angle', angle);

            setRotate(event.target, 'rotate(' + angle + 'deg)')


            // dragMoveListener(event);
        },
        onend: function (event) {
            // resetTimeout = setTimeout(reset, 1000);
            // event.target.classList.add('reset');
        }
    });

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    setTranslate(target, 'translate(' + x + 'px, ' + y + 'px)');

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function setTranslate(el, value) {
    var currentValue = el.style.transform;
    if( currentValue.indexOf('translate') !== -1) {
        var newValue = currentValue.replace(/translate\(.*?\)/gi, value)
    }
    else {
        var newValue = currentValue + ' ' + value;
    }
    el.style.webkitTransform =
        el.style.transform = newValue;

}
function setRotate(el, value) {
    var currentValue = el.style.transform;
    if( currentValue.indexOf('rotate') !== -1) {
        var newValue = currentValue.replace(/rotate\(.*?\)/gi, value)
    }
    else {
        var newValue = currentValue + ' ' + value;
    }
    el.style.webkitTransform =
        el.style.transform = newValue;

}
function setScale(el, value) {
    var currentValue = el.style.transform;
    if( currentValue.indexOf('scale') !== -1) {
        var newValue = currentValue.replace(/scale\(.*?\)/gi, value)
    }
    else {
        var newValue = currentValue + ' ' + value;
    }
    el.style.webkitTransform =
        el.style.transform = newValue;

}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;



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
