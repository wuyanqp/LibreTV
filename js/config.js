// 全局常量配置
const PROXY_URL = '/proxy/';    // 适用于 Cloudflare, Netlify (带重写), Vercel (带重写)
// const HOPLAYER_URL = 'https://hoplayer.com/index.html';
const SEARCH_HISTORY_KEY = 'videoSearchHistory';
const MAX_HISTORY_ITEMS = 5;

// 密码保护配置
// 注意：PASSWORD 环境变量是必需的，所有部署都必须设置密码以确保安全
const PASSWORD_CONFIG = {
    localStorageKey: 'passwordVerified',  // 存储验证状态的键名
    verificationTTL: 90 * 24 * 60 * 60 * 1000  // 验证有效期（90天，约3个月）
};

// 网站信息配置
const SITE_CONFIG = {
    name: 'LibreTV',
    url: 'https://libretv.is-an.org',
    description: '免费在线视频搜索与观看平台',
    logo: 'image/logo.png',
    version: '1.0.3'
};

// API站点配置
const API_SITES = {
    tt: {
        api: 'http://caiji.dyttzyapi.com/api.php/provide/vod/from/dyttm3u8',
        name: '天堂', 
    },
    db: {
        api: 'https://caiji.dbzy5.com/api.php/provide/vod/from/dbm3u8',
        name: '豆瓣', 
    },
    ik: {
        api: 'https://ikunzyapi.com/api.php/provide/vod/from/ikm3u8',
        name: 'ikun',
    },
    hh: {
        api: 'https://hhzyapi.com/api.php/provide/vod/from/hhm3u8',
        name: '豪华',
    },
    mt: {
        api: 'https://caiji.maotaizy.cc/api.php/provide/vod/from/mtm3u8',
        name: '茅台', 
    },
    hn: {
        api: 'https://www.hongniuzy2.com/api.php/provide/vod/from/hnm3u8',
        name: '红牛', 
    },
    my: {
        api: 'https://api.maoyanapi.top/api.php/provide/vod/from/mym3u8',
        name: '猫眼',
    }, 
    mz: {
       api: 'https://mozhuazy.com/api.php/provide/vod/from/mzm3u8',
       name: '魔爪',
    },
    jy: {
        api: 'https://jyzyapi.com/provide/vod/from/jinyingm3u8',
        name: '金鹰', 
    },
    gs: {
        api: 'https://api.guangsuapi.com/api.php/provide/vod/from/gsm3u8',
        name: '光速'
    },
    sb: {
        api: 'https://subocj.com/api.php/provide/vod/from/subm3u8',
        name: '速播'
    },
    lz: {
        api: 'https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8',
        name: '量子'
    },
    xl: {
        api: 'https://api.xinlangapi.com/xinlangapi.php/provide/vod/from/xlm3u8',
        name: '新浪'
    },
    ry: {
        api: 'https://cj.rycjapi.com/api.php/provide/vod/from/rym3u8',
        name: '如意',
    },
    ws: {
        api: 'https://360zyzz.com/api.php/provide/vod/from/360m3u8',
        name: '360'
    },
    bd: {
        api: 'https://api.apibdzy.com/api.php/provide/vod',
        name: '百度'
    },
    bf: {
        api: 'https://bfzyapi.com/api.php/provide/vod',
        name: '暴风'
    },
     zd: {
        api: 'https://api.zuidapi.com/api.php/provide/vod',
        name: '最大'
    },
    uk: {
        api: 'https://api.ukuapi88.com/api.php/provide/vod',
        name: 'U酷'
    },
    ff: {
        api: 'http://api.ffzyapi.com/api.php/provide/vod',
        name: '非凡'
    },
    ty: {
        api: 'https://tyyszyapi.com/api.php/provide/vod',
        name: '天涯'
    },
    qy: {
        api: 'https://iqiyizyapi.com/api.php/provide/vod',
        name: '奇异',
    },
    js: {
        api: 'https://jszyapi.com/api.php/provide/vod',
        name: '极速',
    },
};

// 定义合并方法
function extendAPISites(newSites) {
    Object.assign(API_SITES, newSites);
}

// 暴露到全局
window.API_SITES = API_SITES;
window.extendAPISites = extendAPISites;


// 添加聚合搜索的配置选项
const AGGREGATED_SEARCH_CONFIG = {
    enabled: true,             // 是否启用聚合搜索
    timeout: 8000,            // 单个源超时时间（毫秒）
    maxResults: 10000,          // 最大结果数量
    parallelRequests: true,   // 是否并行请求所有源
    showSourceBadges: true    // 是否显示来源徽章
};

// 抽象API请求配置
const API_CONFIG = {
    search: {
        // 只拼接参数部分，不再包含 /api.php/provide/vod/
        path: '?ac=videolist&wd=',
        pagePath: '?ac=videolist&wd={query}&pg={page}',
        maxPages: 50, // 最大获取页数
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    },
    detail: {
        // 只拼接参数部分
        path: '?ac=videolist&ids=',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    }
};

// 优化后的正则表达式模式
const M3U8_PATTERN = /\$https?:\/\/[^"'\s]+?\.m3u8/g;

// 添加自定义播放器URL
const CUSTOM_PLAYER_URL = 'player.html'; // 使用相对路径引用本地player.html

// 增加视频播放相关配置
const PLAYER_CONFIG = {
    autoplay: true,
    allowFullscreen: true,
    width: '100%',
    height: '600',
    timeout: 15000,  // 播放器加载超时时间
    filterAds: true,  // 是否启用广告过滤
    autoPlayNext: true,  // 默认启用自动连播功能
    adFilteringEnabled: true, // 默认开启分片广告过滤
    adFilteringStorage: 'adFilteringEnabled' // 存储广告过滤设置的键名
};

// 增加错误信息本地化
const ERROR_MESSAGES = {
    NETWORK_ERROR: '网络连接错误，请检查网络设置',
    TIMEOUT_ERROR: '请求超时，服务器响应时间过长',
    API_ERROR: 'API接口返回错误，请尝试更换数据源',
    PLAYER_ERROR: '播放器加载失败，请尝试其他视频源',
    UNKNOWN_ERROR: '发生未知错误，请刷新页面重试'
};

// 添加进一步安全设置
const SECURITY_CONFIG = {
    enableXSSProtection: true,  // 是否启用XSS保护
    sanitizeUrls: true,         // 是否清理URL
    maxQueryLength: 100,        // 最大搜索长度
    // allowedApiDomains 不再需要，因为所有请求都通过内部代理
};

// 添加多个自定义API源的配置
const CUSTOM_API_CONFIG = {
    separator: ',',           // 分隔符
    maxSources: 5,            // 最大允许的自定义源数量
    testTimeout: 5000,        // 测试超时时间(毫秒)
    namePrefix: 'Custom-',    // 自定义源名称前缀
    validateUrl: true,        // 验证URL格式
    cacheResults: true,       // 缓存测试结果
    cacheExpiry: 5184000000,  // 缓存过期时间(2个月)
    adultPropName: 'isAdult' // 用于标记成人内容的属性名
};

// 隐藏内置黄色采集站API的变量
const HIDE_BUILTIN_ADULT_APIS = false;
