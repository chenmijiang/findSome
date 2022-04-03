(function () {
    /*****************************************************************************
     * Engine 保存 engines 配置
     * 
     * ***************************************************************************
     */
    class Engine {
        constructor() {
            this.engines = [];
            this.sugWord = {
                index: -1,
                data: []
            };
        }
        addEngine(engine) {
            engine = JSON.parse(JSON.stringify(engine));
            this.engines.push(engine);
        }
        /**
         * 获取引擎 jsonp 链接
         * @param {*} index 
         * @returns 
         */
        engineSug(index) {
            return this.engines[index].suggest;
        }
        /**
         * 检测使用的引擎
         * @param {*} key
         * @returns
         */
        engineCheck(key) {
            key = (typeof key !== 'number') ? +key : key;
            return this.engines[key].url;
        }
        /**
         * 初始化建议词
         * @param {*} sugWord 
         */
        initSugWord(sugWord) {
            this.sugWord = sugWord;
        }
        /**
         * 更新建议词索引
         */
        updateSugWord(index) {
            this.sugWord.index = index;
        }
    }
    /*****************************************************************************
     * onload 时 加载配置
     * 
     * ***************************************************************************
     */
    var engines = new Engine();
    //加载引擎选择
    window.onload = function () {
        //加载配置文件
        fetch('./config.json').then((res) => res.json())
            .then((data) => {
                let headerDetail = data['header-detail'];
                let engine = data.engine;
                //数据渲染
                console.log("项目地址：", data.github);
                console.log("网页版本：", data.version);
                document.querySelector('.header-detail').innerText = headerDetail;
                let str = '';
                engine.forEach(ele => {
                    str += `<div class="engine-item" data-value="${ele.value}">${ele.name}</div>|`;
                    engines.addEngine(ele);
                });
                str = str.slice(0, str.length - 1);
                document.querySelector('.engine-select-content').innerHTML = str;
            })
        if (localStorage.length) {
            //加载本地存储
            let options = getConfig();
            showAll(options);
        }
    }
    /**
     * 本地保存配置
     * @param {*} options 
     */
    function saveConfig({
        name,
        value,
        theme
    }) {
        let config = getConfig() || {};
        if (name && value) {
            config.name = name;
            config.value = value;
        }
        if (theme !== undefined) {
            config.theme = theme;
        }
        localStorage.setItem('config', JSON.stringify(config));
    }
    /**
     * 本地配置获取
     * @returns 
     */
    function getConfig() {
        let config = JSON.parse(localStorage.getItem('config'))
        return config;
    }
    /*****************************************************************************
     * 事件监听
     * 
     * ***************************************************************************
     */
    // 搜索
    let searchBtn = document.getElementById('search');
    searchBtn.addEventListener('click', searchEvent);
    let lock = false;
    let input = document.getElementById('input-content');
    input.addEventListener('compositionstart', () => {
        lock = true;
    })
    input.addEventListener('compositionend', () => {
        lock = false;
    })
    //引擎选择
    let select = document.getElementsByClassName('engine-select')[0];
    select.addEventListener('click', function () {
        let selectBox = document.getElementsByClassName('engine-select-box')[0];
        let show = selectBox.classList.contains('active');
        if (!show) {
            selectBox.onclick = function (e) {
                let target = e.target;
                if (target.className === 'engine-item') {
                    let name = e.target.innerHTML;
                    let value = e.target.getAttribute('data-value');
                    let options = {
                        name,
                        value
                    };
                    showEngine(options);
                    saveConfig(options);
                    //资源释放
                    selectBox.classList.remove('active');
                    selectBox.onclick = null;
                    return;
                }
            }
        } else {
            selectBox.onclick = null;
        }
        selectBox.classList.toggle('active');
    })
    //主题切换
    let themeToggle = document.querySelector('#theme-toggle');
    themeToggle.addEventListener('change', function () {
        document.body.classList.toggle('dark');
        saveConfig({
            theme: this.checked
        })
    })
    //选择建议
    let sugs = document.getElementsByClassName('sugs')[0];
    sugs.addEventListener('click', function (e) {
        let word = e.target.innerText;
        document.getElementById('input-content').value = word;
        searchEvent();
    })
    //快捷键
    document.onkeyup = function (e) {
        e.preventDefault();
        var event = e || window.event;
        var key = event.which || event.keyCode || event.charCode;
        if (+key === 13) {
            //监听回车键
            searchEvent();
            return;
        } else if (+key === 38 || +key === 40) {
            let sugBox = document.getElementsByClassName('sugBox')[0];
            if (sugBox.classList.contains('active')) {
                let index = engines.sugWord.index;
                let length = engines.sugWord.data.length;
                if (+key === 38) {
                    //监听方向键 ⬆️
                    --index <= -1 ? index = length - 1 : 0;
                    engines.updateSugWord(index);
                    showSelectSug(index, length);
                    return;
                }
                if (+key === 40) {
                    //监听方向键 ⬇️
                    ++index === length ? index = 0 : 0;
                    engines.updateSugWord(index);
                    showSelectSug(index, length);
                    return;
                }
            }
        } else if (!lock) {
            // 中文输入时候的bug
            let content = document.getElementById('input-content').value.trim();
            sugEvent(content);
        }
    };

    function searchEvent() {
        let word = document.getElementById('input-content').value.trim();
        if (word) {
            //设置搜索过滤
            word = filterWord(word);

            let key = document.querySelector('.engine-select').getAttribute('data-value');
            let baseURL = engines.engineCheck(key);
            let searchURL = baseURL + word;

            //搜索跳转
            window.location.href = searchURL;
        }
    }
    /**
     * 搜索词过滤
     * @param {*} word 
     * @returns 
     */
    function filterWord(word) {
        // 去除关键词中的空格
        word = word.replace(' ', '+');
        return word;
    }
    /**
     * 搜索建议请求发送
     */
    function sugEvent(word) {
        if (word) {
            let key = document.querySelector('.engine-select').getAttribute('data-value');
            let baseURL = engines.engineSug(key);
            let jsonpURL = baseURL.replace('#content#', filterWord(word));

            let script = document.createElement('script');
            script.setAttribute('src', jsonpURL);
            //移除之前请求链接
            let scripts = document.querySelectorAll('script');
            Array.prototype.filter
                .call(scripts, (e) => {
                    return e.src && e.src.includes('window.sug')
                })
                .forEach((e) => {
                    document.body.removeChild(e);
                })
            document.body.appendChild(script);
        } else {
            showSug([]);
        }
    }
    window.sug = {
        google: function (result) {
            let data = result[1].map(e => e[0]);
            showSug(data)
        },
        bing: function (result) {
            let data;
            if (!result.AS.FullResults) {
                data = [];
            } else {
                data = result.AS.Results[0].Suggests.map(e => e.Txt);
            }
            showSug(data)
        },
        baidu: function (result) {
            let data = result.s;
            if (data.length) {
                showSug(data);
            }
        }
    }
    /*****************************************************************************
     * 视图显示
     * 
     * ***************************************************************************
     */
    /**
     * 页面显示本地保存的配置
     * @param {*} options 
     */
    function showAll(options) {
        showTheme(options);
        showEngine(options);
    }
    /**
     * 显示选择的引擎
     * @param {*} options 
     */
    function showEngine(options) {
        if (options.value && options.name) {
            let select = document.getElementsByClassName('engine-select')[0];
            select.setAttribute("data-value", options.value);
            select.innerHTML = options.name;
        }
    }
    /**
     * 显示选择的主题
     * @param {*} options 
     */
    function showTheme(options) {
        options.theme === true ? document.body.classList.add('dark') : 1;
    }
    /**
     * 显示建议
     * @param { aray } data 
     * @returns 
     */
    function showSug(data) {
        let sugBox = document.getElementsByClassName('sugBox')[0];
        let classList = sugBox.classList;
        if (data.length && !classList.contains('active')) {
            classList.add('active');
        } else if (!data.length) {
            classList.contains('active') ? classList.remove('active') : '';
            return;
        }
        engines.initSugWord({
            index: -1,
            data: data
        })
        let sugs = document.getElementsByClassName('sugs')[0];
        let str = data.reduce((pre, cur) => pre + `<li class="sug">${cur}</li>`, '');
        sugs.innerHTML = str;
    }
    /**
     * 显示被选中建议
     * @param {number} index 
     * @param {number} length
     */
    function showSelectSug(index, length) {
        let sug = document.querySelectorAll('.sug');
        if (length > 1) {
            let pre = index <= 0 ? length - 1 : index - 1;
            let next = index >= length - 1 ? 0 : index + 1;
            sug[pre].classList.contains('select') ? sug[pre].classList.remove('select') : 0;
            sug[next].classList.contains('select') ? sug[next].classList.remove('select') : 0;
        }

        sug[index].classList.add('select');
        document.getElementById('input-content').value = sug[index].innerText;
    }
})()