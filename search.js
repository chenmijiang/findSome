(function () {
    //加载引擎选择
    window.onload = function () {
        //加载配置文件
        fetch('./config.json').then((res) => res.json())
            .then((data) => {
                let headerDetail = data['header-detail'];
                let engine = data.engine;
                //数据渲染
                console.log("网页版本：", data.version);
                document.querySelector('.header-detail').innerText = headerDetail;
                let str = '';
                engine.forEach(ele => {
                    str += `<div class="engine-item" data-value="${ele.value}">${ele.name}</div>|`;
                });
                str = str.slice(0, str.length - 1);
                document.querySelector('.engine-select-content').innerHTML = str;
            })
        if (localStorage.length) {
            //加载本地存储
            let options = getConfig();
            showEngine(options);
        }
    }

    // 搜索
    let searchBtn = document.getElementById('search');
    searchBtn.addEventListener('click', searchEvent);

    //监听回车键
    document.onkeyup = function (e) {
        // 兼容FF和IE和Opera
        var event = e || window.event;
        var key = event.which || event.keyCode || event.charCode;
        if (key == 13) {
            searchEvent();
        }
    };

    function searchEvent() {
        let word = document.getElementById('input-content').value.trim();
        if (word) {
            let key = document.querySelector('.engine-select').getAttribute('data-value');
            let baseURL = engineCheck(key);
            let searchURL = baseURL + word;
            //设置搜索过滤

            //搜索跳转
            window.location.href = searchURL;
        }
    }

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

    /**
     * 显示选择的引擎
     * @param {*} options 
     */
    function showEngine(options) {
        let select = document.getElementsByClassName('engine-select')[0];
        select.setAttribute("data-value", options.value);
        select.innerHTML = options.name;
    }


    /**
     * 本地保存引擎选择
     * @param {*} options 
     */
    function saveConfig(options) {
        localStorage.setItem('name', options.name);
        localStorage.setItem('value', options.value);
    }

    /**
     * 获取本地引擎选择
     * @returns 
     */
    function getConfig() {
        let name = localStorage.getItem('name');
        let value = localStorage.getItem('value');
        return {
            name,
            value
        };
    }

    /**
     * 检测使用的引擎
     * @param {*} key 
     * @returns 
     */
    function engineCheck(key) {
        key = (typeof key !== 'number') ? +key : key;
        if (key === 1) {
            return "https://www.google.com/search?q=";
        } else if (key === 2) {
            return "https://cn.bing.com/search?q=";
        } else if (key === 3) {
            return "https://www.baidu.com/s?wd=";
        } else {
            return "https://www.google.com/search?q=";
        }
    }
})()