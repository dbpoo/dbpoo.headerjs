(function (window) {

    var document = window.document;
    var fns = [];
    var args = [];
    var isReady = false;
    var errorHandler = null;

    /**
     * Call a ready handler
     * @private
     * @param {function} fn
     */
    var call = function (fn) {
        try {
            // call function
            fn.apply(this, args);
        } catch (e) {
            // error occured while executing function
            if (errorHandler !== null) {
                errorHandler.call(this, e);
            }
        }
    };

    /**
     * Call all ready handlers
     * @private
     */
    var run = function () {
        var x;

        isReady = true;

        // call all registered functions
        for (x = 0; x < fns.length; x = x + 1) {
            call(fns[x]);
        }

        // clear handlers
        fns = [];
    };

    /**
     * Initialize
     * @private
     */
    var init = function () {
        if (window.addEventListener) {
            // for all browsers except IE
            document.addEventListener('DOMContentLoaded', function () { run(); }, false);
        } else {
            // for IE
            // code taken from http://javascript.nwbox.com/IEContentLoaded/
            var poll = function () {
                // check IE's proprietary DOM members
                if (!document.uniqueID && document.expando) {
                    return;
                }

                // you can create any tagName, even customTag like <document :ready />
                var tempNode = document.createElement('document:ready');

                try {
                    // see if it throws errors until after ondocumentready
                    tempNode.doScroll('left');

                    // call run
                    run();
                } catch (e) {
                    window.setTimeout(poll, 10);
                }
            };

            // trying to always fire before onload
            document.onreadystatechange = function() {
                if (document.readyState === 'complete') {
                    document.onreadystatechange = null;
                    run();
                }
            };

            poll();
        }
    };

    /**
     * @namespace domReady
     *
     * @public
     * @param {function} fn
     * @return {domReady}
     */
    var domReady = function (fn) {
        return domReady.on(fn);
    };

    /**
     * Add code or function to execute when the DOM is ready
     * @public
     * @param {function} fn
     * @return {domReady}
     */
    domReady.on = function (fn) {
        // call imediately when DOM is already ready
        if (isReady) {
            call(fn);
        } else {
            // add to the list
            fns[fns.length] = fn;
        }

        return this;
    };

    /**
     * Set params that will be passed to every ready handler
     * @public
     * @param {Array.<*>} params
     * @return {domReady}
     */
    domReady.params = function (params) {
        args = params;
        return this;
    };

    /**
     * Set error callback
     * @public
     * @param {function([Error|string])} fn
     * @return {domReady}
     */
    domReady.error = function (fn) {
        errorHandler = fn;
        return this;
    };

    // initialize
    init();

    // make global
    window.domReady = domReady;

})(window);

(function (scriptId, styleVersion) {
    var gameData = [
        {
            'title':'卡牌游戏',
            'list' :
            [
                {
                    'name':'暗黑黎明',
                    'status':'',
                    'href':'http://anhei.ledo.com/',
                    'img':'http://ledo.com/dist/img/icon-anhei.png'
                },
                {
                    'name':'暗黑黎明2',
                    'status':'hot',
                    'href':'http://anhei2.ledo.com/',
                    'img':'http://ledo.com/dist/img/icon-anhei2.png'
                },
                {
                    'name':'龙戒',
                    'status':'',
                    'href':'http://gz.ledo.com/',
                    'img':'http://ledo.com/dist/img/icon-gz.png'
                },
                {
                    'name':'燃烧战歌',
                    'status':'',
                    'href':'http://zg.ledo.com/',
                    'img':'http://ledo.com/dist/img/icon-rszg.png'
                }
            ]
        },
        {
            'title': '东方武侠',
            'list':
            [
                {
                    'name':'神雕侠侣端游',
                    'status':'',
                    'href':'http://sdxl.wanmei.com/',
                    'img':'http://ledo.com/dist/img/icon-sdxlduan.png'
                },
                {
                    'name':'神雕侠侣手游',
                    'status':'',
                    'href':'http://sdxl.laohu.com/',
                    'img':'http://ledo.com/dist/img/icon-sdxl.png'
                }
            ]
        },
        {
            'title': '架空幻想',
            'list':
                [
                    {
                        'name':'永恒之歌',
                        'status':'',
                        'href':'http://yhzg.ledo.com/',
                        'img':'http://ledo.com/dist/img/icon-yhzg.png'
                    },
                    {
                        'name':'迷城物语',
                        'status':'',
                        'href':'http://mcwy.ledo.com/',
                        'img':'http://ledo.com/dist/img/icon-mcwy.png'
                    }
                ]
        },
        {
            'title': '日系动漫',
            'list':
                [
                    {
                        'name':'魔力宝贝',
                        'status':'',
                        'href':'http://cg.laohu.com/',
                        'img':'http://ledo.com/dist/img/icon-mlbb.png'
                    },
                    {
                        'name':'如果的世界',
                        'status':'hot',
                        'href':'http://if.ledo.com/',
                        'img':'http://ledo.com/dist/img/icon-if.png'
                    }
                ]
        },
        {
            'title': '游戏改编',
            'list':
                [
                    {
                        'name':'拳皇97OL',
                        'status':'',
                        'href':'http://kof.ledo.com/',
                        'img':'http://ledo.com/dist/img/icon-kof.png'
                    }
                ]
        }
    ];
    var gameGG = [{
        'img':'http://picture.ledo.com/ledo/wrapper/top20170201.jpg',
        'href':'http://anhei2.ledo.com'
    },{
        'img':'http://picture.ledo.com/ledo/wrapper/top20170202.jpg',
        'href':'http://if.ledo.com'
    }];
    var doc = window.document;
    var util = {
        loadCSS: function( href, before, media ) {
          // Arguments explained:
          // `href` [REQUIRED] is the URL for your CSS file.
          // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
          // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
          // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
          var doc = window.document;
          var ss = doc.createElement( "link" );
          var ref;
          if( before ){
              ref = before;
          }
          else {
              var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
              ref = refs[ refs.length - 1];
          }

          var sheets = doc.styleSheets;
          ss.rel = "stylesheet";
          ss.href = href;
          // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
          ss.media = "only x";

          // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
          function ready( cb ){
              if( doc.body ){
                  return cb();
              }
              setTimeout(function(){
                  ready( cb );
              });
          }
          // Inject link
          // Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
          // Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
          ready( function(){
              ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
          });
          // A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
          var onloadcssdefined = function( cb ){
              var resolvedHref = ss.href;
              var i = sheets.length;
              while( i-- ){
                  if( sheets[ i ].href === resolvedHref ){
                      return cb();
                  }
              }
              setTimeout(function() {
                  onloadcssdefined( cb );
              });
          };

          function loadCB(){
              if( ss.addEventListener ){
                  ss.removeEventListener( "load", loadCB );
              }
              ss.media = media || "all";
          }

          // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
          if( ss.addEventListener ){
              ss.addEventListener( "load", loadCB);
          }
          ss.onloadcssdefined = onloadcssdefined;
          onloadcssdefined( loadCB );
          return ss;
        },
        onloadCSS: function( ss, callback ) {
            var called;
            function newcb(){
                if( !called && callback ){
                    called = true;
                    callback.call( ss );
                }
            }
            if( ss.addEventListener ){
                ss.addEventListener( "load", newcb );
            }
            if( ss.attachEvent ){
                ss.attachEvent( "onload", newcb );
            }

            // This code is for browsers that don’t support onload
            // No support for onload (it'll bind but never fire):
            //	* Android 4.3 (Samsung Galaxy S4, Browserstack)
            //	* Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
            //	* Android 2.3 (Pantech Burst P9070)

            // Weak inference targets Android < 4.4
            if( "isApplicationInstalled" in navigator && "onloadcssdefined" in ss ) {
                ss.onloadcssdefined( newcb );
            }
        },
        loadJS: function( src, cb ) {
            var ref = w.document.getElementsByTagName( "script" )[ 0 ];
            var script = w.document.createElement( "script" );
            script.src = src;
            script.async = true;
            ref.parentNode.insertBefore( script, ref );
            if (cb && typeof(cb) === "function") {
                script.onload = cb;
            }
            return script;
        }
    };
    var gameHtml = "";
    for(var i=0; i<gameData.length;i++){
        gameHtml += '<dl><dt>'+ gameData[i].title +'</dt>';

        for(var j=0; j<gameData[i].list.length;j++) {
            gameHtml += '<dd><img src="'+ gameData[i].list[j].img +'" alt=""><span>'+ gameData[i].list[j].name;
            if(gameData[i].list[j].status != ''){
                gameHtml += ' <i class="pubicon-'+ gameData[i].list[j].status +'"></i>'
            }
            gameHtml += '</span><a href="'+ gameData[i].list[j].href +'" target="_blank">进入官网</a></dd>'
        }

        gameHtml +='</dl>';
    }

    var ggHtml = '';
    for(var k=0; k<gameGG.length;k++){
        ggHtml += '<a href="'+ gameGG[k].href +'" target="_blank"><img src="'+ gameGG[k].img +'" alt=""></a>'
    }

    var headerHtml = '<div class="ld-header">' +
        '<div class="ld-header-container">' +
        '<div class="ld-header-logo"><a class="ld-header-logo" href="http://www.ledo.com/" target="_blank"></a></div>' +
        '<div class="ld-header-nav" id="ld-header-nav">' +
        '<ul>' +
        '<li><a href="https://passport.ledo.com/login" target="_blank" class="ld-header-navbtn">用户中心</a></li>' +
        '<li><a href="#" target="_blank" class="ld-header-navbtn">客户服务</a><div class="ld-header-toggle"><div class="ld-header-kf"></div></div></li>' +
        '<li><a href="javascript:;" class="ld-header-navbtn">乐道游戏目录<em></em></a><div class="ld-header-toggle"><div class="ld-header-link">'+ gameHtml +'</div><div class="ld-header-img">'+ ggHtml +'</div></div></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>';

    function createLedoHeader(){
        var headID = document.getElementById('pub-header');
        var bodyNode = document.body;
        if(!headID) {
            headID = document.createElement('div');
            headID.id = 'pub-header';
            headID.innerHTML = headerHtml;
            bodyNode.insertBefore(headID,bodyNode.firstChild);
            var navLI = headID.getElementsByTagName('li');
            for (var i = 0; i < navLI.length; i++) {
                navLI[i].onmouseover = function(){
                    if(this.className !='pubcur') {
                        this.className = 'pubcur';
                    }
                };
                if ("onmouseleave" in navLI[i]) {
                    navLI[i].onmouseleave = function() {
                        this.className = ""
                    }
                } else {
                    navLI[i].onmouseout = function() {
                        this.className = ""
                    }
                }
            }
        }
    }
    
    var headerCSS = 'pub-header.css?v=' + styleVersion;
    domReady(function(){
        var hdCSS = null;
        var cssNode = document.getElementsByTagName("link")[0];
        if (cssNode) {
            hdCSS = util.loadCSS(headerCSS, cssNode)
        } else {
            hdCSS = util.loadCSS(headerCSS)
        }
        util.onloadCSS( hdCSS, function() {
            createLedoHeader();
        });
    });


})('pub-header','20170612');