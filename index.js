const ACID_GROUPS = {
    'no3': 1,
    'f': 1,
    'cl': 1,
    'br': 1,
    'i': 1,
    'so4': 2,
    'so3': 2,
    's': 2,
    'co3': 2,
    'sio3': 2,
    'po4': 3,
},
    METALS = [
        "li",
        "na",
        "k",
        "rb",
        "cs",
        "fr",
        "ca",
        "sr",
        "ba",
        "ra",
        "be",
        "mg",
        "sc",
        "ti",
        "v",
        "cr",
        "mn",
        "fe",
        "co",
        "ni",
        "cu",
        "zn",
        "y",
        "zr",
        "nb",
        "mo",
        "tc",
        "ru",
        "rh",
        "pd",
        "ag",
        "cd",
        "la",
        "hf",
        "ta",
        "w",
        "re",
        "os",
        "ir",
        "pt",
        "au",
        "hg",
        "ac",
        "rf",
        "db",
        "sg",
        "bh",
        "hs",
        "mt",
        "ds",
        "rg",
        "cn",
        "al",
        "ga",
        "in",
        "sn",
        "tl",
        "pb",
        "bi",
        "b",
        "si",
        "ge",
        "as",
        "sb",
        "te",
        "po"
      ],
    HYDROXIDE_GROUP = 'oh';

const HYDROXIDE = 'HYDROXIDE',
    SALT = 'SALT',
    ACID = 'ACID',
    OXIDE = 'OXIDE',
    UNKNOWN_SUBSTANSE = 'UNKNOWN_SUBSTANSE';

const decorateFormulaArea = (flaView, maxCount) => {
    return `<div id="root2" style="height: ${maxCount*30}px;">
        ${flaView}
        </div>`
}

const drawElementColumn = (el, count) => {
    let column = "";
    for(let i = 0; i < count; i++){
        column += el === HYDROXIDE_GROUP ? (
            `<div class="oh-element"> 
                <div class="element">O</div>
                <div class="_single-bonding bonding"><span>—</span></div>
                <div class="element">H</div>
            </div>`
        ) : el === 'ho' ? (
            `<div class="ho-element"> 
                <div class="element">O</div>
                <div class="_single-bonding bonding"><span>—</span></div>
                <div class="element">H</div>
            </div>`
        ) : '<div class="element">'+el+'</div>';
    }
    column = '<div class="element-column column">' + column + '</div>';
    return column;
}

const drawBondColumn = (f_el_count, s_el_count, isSingleBonding = false) => {
    if (!f_el_count || !s_el_count) return '';
    switch (f_el_count){
        case 1: {
            return s_el_count === 1 ? (
                isSingleBonding ? 
                '<div class="bonding-column column"><div class="_single-bonding bonding"><span>—</span></div></div>' 
                : '<div class="bonding-column column"><div class="_dual-bonding bonding"><div class="_1st">—</div><div class="_2nd">—</div></div></div>'
            ) : (
                s_el_count === 2 ? (
                    isSingleBonding ? 
                    `<div class="bonding-column column">
                        <div class="_single-bonding bonding" style="transform: rotate(-15deg)"><span>—</span></div>
                        <div class="_single-bonding bonding" style="transform: rotate(15deg)"><span>—</span></div>
                    </div>`
                    : `<div class="bonding-column column">
                        <div class="_dual-bonding bonding" style="transform: rotate(-15deg)"><div class="_1st">—</div><div class="_2nd">—</div></div>
                        <div class="_dual-bonding bonding" style="transform: rotate(15deg)"><div class="_1st">—</div><div class="_2nd">—</div></div>
                    </div>`
                ) : (
                    s_el_count === 3 ? (
                        isSingleBonding ?
                        `<div class="bonding-column column">
                            <div class="_single-bonding bonding" style="transform: rotate(-20deg)"><span>—</span></div>
                            <div class="_single-bonding bonding"><span>—</span></div>
                            <div class="_single-bonding bonding" style="transform: rotate(20deg)"><span>—</span></div>
                        </div>`
                        : `<div class="bonding-column column">
                            <div class="_dual-bonding bonding" style="transform: rotate(-20deg)"><div class="_1st">—</div><div class="_2nd">—</div></div>
                            <div class="_dual-bonding bonding"><div class="_1st">—</div><div class="_2nd">—</div></div>
                            <div class="_dual-bonding bonding" style="transform: rotate(20deg)"><div class="_1st">—</div><div class="_2nd">—</div></div>
                        </div>`
                    ) : (
                        null
                    )
                )
            )
        }
        case 2: {
            return s_el_count === 1 ? (
                isSingleBonding ? 
                `<div class="bonding-column column">
                    <div class="_single-bonding bonding" style="transform: rotate(15deg)"><span>—</span></div>
                    <div class="_single-bonding bonding" style="transform: rotate(-15deg)"><span>—</span></div>
                </div>` 
                : `<div class="bonding-column column">
                    <div class="_single-bonding bonding" style="transform: rotate(15deg)"><span>—</span></div>
                    <div class="_single-bonding bonding" style="transform: rotate(-15deg)"><span>—</span></div>
                </div>`
            ) : (
                s_el_count === 3 ? (
                    `<div class="bonding-column column">
                    <div class="_dual-bonding bonding" style="transform: rotate(-15deg)"><div class="_1st">—</div><div class="_2nd">—</div></div>
                    <div class="_single-bonding bonding" style="transform: rotate(15deg)"><span>—</span></div>
                    <div class="_single-bonding bonding" style="transform: rotate(-15deg)"><span>—</span></div>
                    <div class="_dual-bonding bonding" style="transform: rotate(15deg)"><div class="_1st">—</div><div class="_2nd">—</div></div>
                </div>`
                ) : (
                    s_el_count === 4 ? (
                        null
                    ) : (
                        s_el_count === 5 ? (
                            `<div class="bonding-column column">
                            <div class="_dual-bonding bonding" style="transform: rotate(-25deg)"><div class="_1st">—</div><div class="_2nd">—</div></div>
                            <div class="_dual-bonding bonding" style="transform: rotate(5deg)"><div class="_1st">—</div><div class="_2nd">—</div></div>
                            <div class="_single-bonding bonding" style="transform: rotate(25deg)"><span>—</span></div>
                            <div class="_single-bonding bonding" style="transform: rotate(-25deg)"><span>—</span></div>
                            <div class="_dual-bonding bonding" style="transform: rotate(-5deg)"><div class="_1st">—</div><div class="_2nd">—</div></div>
                            <div class="_dual-bonding bonding" style="transform: rotate(25deg)"><div class="_1st">—</div><div class="_2nd">—</div></div>
                        </div>`
                        ) : (
                            null
                        )
                    )
                )
            );
        }
        case 3: {
            return null;
        }
        default:
            return null;
    }
}

const isOxide = (fla) => {
    return (fla.substr(-1) === 'o') 
        || (Number.isInteger(+fla.substr(-1)) && fla.substr(-2,1) === 'o');
}

// SO4 распознает как соль, а не как оксид!
const checkSubstanceKind = (formula) => {
    let _f = formula.toLowerCase();

    if (_f.indexOf(HYDROXIDE_GROUP) !== -1
        && METALS.some(me => _f.indexOf(me) !== -1)) return HYDROXIDE;

    for (let key in ACID_GROUPS) {
        if (_f.indexOf(key) !== -1 && _f.indexOf(key) === _f.length - key.length -1) {
            return _f[0] === 'h' ? ACID : (
                METALS.some(me => _f.indexOf(me) === 0) 
                    ? SALT : isOxide(_f) 
                        ? OXIDE : UNKNOWN_SUBSTANSE
            );
        };
    }

    if (isOxide(_f)) return OXIDE;
    
    return UNKNOWN_SUBSTANSE;
}

const findOxGroupStruct = (f, el) => {
    let struct = {},
        len = el.length;

    f.substr(-len) === el ? (
        struct[el] = 1,
        f = f.substr(0, f.length - len)
    ) : (
        Number.isInteger(+f.substr(-1)) && f.substr(-len*2, len) === el ? (
            struct[el] = +f.substr(-1), 
            f = el === HYDROXIDE_GROUP ? f.substr(0,f.length - 5) : f.substr(0,f.length - 2)
        ) : null
    );

    Number.isInteger(+f.substr(-1)) ?
        (
            struct[f.substr(0,f.length - 1)] = +f.substr(-1)
        ) : (
            struct[f] = 1
        )

    return struct;
}

const drawOxide = (f) => {
    let struct = {},
        _f = f.toLowerCase(),
        view = '',
        maxCount = 0;

    struct = findOxGroupStruct(_f, 'o');

    let keysArr = Object.keys(struct);
    view = keysArr.reduce((accum, el, index) => {
        maxCount = maxCount > struct[el] ? maxCount : struct[el];
        let nextCount = struct[keysArr[index + 1]];
        return el === 'o' ? 
            accum + drawBondColumn(nextCount, struct[el], true) + drawElementColumn(el,struct[el]) 
            : drawElementColumn(el, struct[el]) + drawBondColumn(struct[el], nextCount, true) + accum;
    }, '');

    return decorateFormulaArea(view, maxCount);
}

const drawHydroxide = (f) => {
    let struct = {},
        _f = f.toLowerCase(),
        view = '',
        maxCount = 0;

    struct = findOxGroupStruct(_f, HYDROXIDE_GROUP);
    console.log(struct);

    let keysArr = Object.keys(struct);
    view = keysArr.reduce((accum, el, index) => {
        maxCount = maxCount > struct[el] ? maxCount : struct[el];
        let nextCount = struct[keysArr[index + 1]];
        return el === HYDROXIDE_GROUP ? 
            accum + drawBondColumn(nextCount, struct[el], true) + drawElementColumn(el, struct[el]) 
            : drawElementColumn(el, struct[el]) + drawBondColumn(struct[el], nextCount, true) + accum;
    }, '');

    return decorateFormulaArea(view, maxCount);
}

const drawAcid = (f) => {
    let struct = {},
    _f = f.toLowerCase(),
    view = '',
    maxCount = 0,
    minCount = 0;

    let elem = Object.keys(ACID_GROUPS).find(el => _f.indexOf(el) !== -1);
    if(!elem) return null;
    struct = findOxGroupStruct(_f, elem);
    if(elem.indexOf('o') !== -1){
        struct = {
            ...struct, 
            ...findOxGroupStruct(elem, 'o')
        };
        if(struct.o < struct.h) return null;
        minCount = struct.h;
        delete struct[elem];
        delete struct.h;
        struct.o = struct.o - minCount;
        maxCount = minCount;

        let keysArr = Object.keys(struct);
        view = keysArr.reduce((accum, el, index) => {
            maxCount = maxCount > struct[el] ? maxCount : struct[el];
            let nextCount = struct[keysArr[index + 1]];
            return el === 'o' ? 
                accum + drawBondColumn(nextCount, struct[el]) + drawElementColumn(el, struct[el])
                : drawElementColumn(el, struct[el]) + drawBondColumn(struct[el], nextCount) + accum;
        }, '');

        view = drawElementColumn('ho', minCount) + drawBondColumn(minCount, 1) + view;
    } else {
        let keysArr = Object.keys(struct);
        view = keysArr.reduce((accum, el, index) => {
            maxCount = maxCount > struct[el] ? maxCount : struct[el];
            let nextCount = struct[keysArr[index + 1]];
            return el === 'h' ? 
                drawElementColumn(el, struct[el]) + drawBondColumn(struct[el], nextCount, true) + accum
                : accum + drawBondColumn(nextCount, struct[el], true) + drawElementColumn(el, struct[el]);
        }, '');
    }
    return decorateFormulaArea(view, maxCount);
}

window.addEventListener('load', () => {
    let infoArea = getId('root3'),
        inputField = getId('inputField'),
        formula,
        flaView;

    
    //setStyles(flaArea);

    inputField.addEventListener('keypress', (e) => {
        if (e.keyCode === 13 && inputField.value){
            formula = inputField.value;
            switch (checkSubstanceKind(formula)){
                case OXIDE: 
                    flaView = drawOxide(formula);
                    break;
                case HYDROXIDE:
                    flaView = drawHydroxide(formula);
                    break;
                case ACID:
                    flaView = drawAcid(formula);
                    break;
                default:
                    flaView = '';
            }

            // решение
            infoArea.innerHTML = '';
            //setStyles(flaArea);
            infoArea.innerHTML = infoArea.innerHTML 
                + '<p>введенное вещество <strong>' + checkSubstanceKind(formula) + '</strong></p>'
                + flaView;
        }
    })
    
})

function getId(id){
	return document.getElementById(id);
}

function setStyles(el){
    el.innerHTML = `<style>
    #root{width: 500px;overflow: auto;}
    #root2{min-height: 120px;}
    .orbital{
        width: 30px;height: 30px;box-sizing: border-box;background-color: white;border: 1px solid black;
    }
    .orbital.single{background-image: url(arrows1_30.png);}
    .orbital.double{background-image: url(arrows2_30.png);}
    .level{font-size: 0;max-width: 530px;}
    .level:before{font-size: 16px;position: relative;top: -10px;}
    .level > div {display: inline-block;}
    .s-level{margin-left: 10px;}
    .s-level:before{content: "s ";}
    .p-level{margin-left: 40px;}
    .p-level:before{content: "p ";}
    .d-level{margin-left: 130px;}
    .d-level:before{content: "d ";}
    .f-level{margin-left: 280px;}
    .f-level:before{content: "f ";}
    .g-level{ margin-left: 490px;}
    .g-level:before{content: "g ";}
    </style>`;
}