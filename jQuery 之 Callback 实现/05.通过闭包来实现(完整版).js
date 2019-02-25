jQuery.Callbacks = function( options ) {
    var options = createOptions(options);
   
    var 
      memory,
  
      // Flag to know if list was already fired
      // 是否已经 fire 过
      fired,
      // Flag to know if list is currently firing
      // 当前是否还处于 firing 过程中
      firing,
      // First callback to fire (used internally by add and fireWith)
      // fire 调用的起始下标
      firingStart,
   
      // End of the loop when firing
      // 需要 fire 调用的队列长度
      firingLength,
   
      // Index of currently firing callback (modified by remove if needed)
      // 当前正在 firing 的回调在队列的索引
      firingIndex,
   
      // Actual callback list
      // 回调队列
      list = [],
   
      // Stack of fire calls for repeatable lists
      // 如果不是 once 的，stack 实际上是一个队列，用来保存嵌套事件 fire 所需的上下文跟参数
      stack = !options.once && [],
   
      _fire = function( data ) {
      };
   
    var self = {
        // 其中的 stack 用来保存在 fire 之后添加进来的函数。
        // 而 firingIndex, firingLength 则用来保证在调用函数的过程中，我们还可以对这个队列进行操作。实现并发的处理。
        // 我们从 add 函数开始。
        add: function() {
            if ( list ) {  // 如果使用了 once，在触发完成之后，就不能再添加回调了。
                // First, we save the current length, 保存当前的队列长度
                var start = list.length;
                (function add( args ) {
                    jQuery.each( args, function( _, arg ) {  
                        var type = jQuery.type( arg );
                        if ( type === "function" ) {
                            if ( !options.unique || !self.has( arg ) ) {
                                list.push( arg );
                            }
                        } else if ( arg && arg.length && type !== "string" ) {
                            // Inspect recursively
                            add( arg );
                        }
                    });
                })( arguments );
                // Do we need to add the callbacks to the
                // current firing batch? 正在 firing 中，队列长度发生了变化
                if ( firing ) {
                    firingLength = list.length;
                // With memory, if we're not firing then
                // we should call right away 如果是 memory 状态，而且已经触发过了，直接触发, memory 是保存了上次触发的状态
                } else if ( memory ) {
                    firingStart = start;
                    fire( memory );
                }
            }
            return this;
        },
        // 删除就简单一些了。检查准备删除的函数是否在队列中，while 的作用是一个回调可能被多次添加到队列中。
        // Remove a callback from the list
        remove: function() {
            if ( list ) {
                jQuery.each( arguments, function( _, arg ) {
                    var index;
                    while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                        list.splice( index, 1 );
                        // Handle firing indexes
                        if ( firing ) {
                            if ( index <= firingLength ) {
                                firingLength--;
                            }
                            if ( index <= firingIndex ) {
                                firingIndex--;
                            }
                        }
                    }
                });
            }
            return this;
        },
        // Check if a given callback is in the list.
        // If no argument is given, return whether or not list has callbacks attached.
        has: function( fn ) {
            return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
        },
        // Remove all callbacks from the list
        empty: function() {
            list = [];
            firingLength = 0;
            return this;
        },
        // Have the list do nothing anymore
        disable: function() {
            list = stack = memory = undefined;
            return this;
        },
        // Is it disabled?
        disabled: function() {
            return !list;
        },
        // Lock the list in its current state
        lock: function() {
            stack = undefined;
            if ( !memory ) {
                self.disable();
            }
            return this;
        },
        // Is it locked?
        locked: function() {
            return !stack;
        },
        fireWith : function(context, args){
            _fire([context, args]);
        },
        // Fire callbacks
        fire = function( data ) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for ( ; list && firingIndex < firingLength; firingIndex++ ) {
                if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
                    memory = false; // To prevent further calls using add
                    break;
                }
            }
            firing = false;
            if ( list ) {
                if ( stack ) {
                    if ( stack.length ) {
                        fire( stack.shift() );
                    }
                } else if ( memory ) {
                    list = [];
                } else {
                    self.disable();
                }
            }
        },
        /* other function */
    }
    return self;
};

// 测试代码如下：
function fn1(args) {
    console.log("fn1: " + args);
}
function fn2(args) {
    console.log("fn2: " + args);
}

var callbacks = Callbacks();
callbacks.add(fn1);
console.log(Callbacks.list)
callbacks.fire("Alice");

callbacks.add(fn2);
callbacks.fire("Tom");

callbacks.remove(fn1);
callbacks.fire("Grace");