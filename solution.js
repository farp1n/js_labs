
console.log("Інструкція до функції triangle(value1, type1, value2, type2):");
console.log("Доступні типи: 'leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'");
console.log("Приклад: triangle(7, 'leg', 18, 'hypotenuse');");

function triangle(val1, type1, val2, type2) {
    
    if (val1 <= 0 || val2 <= 0) {
        console.log("Zero or negative input");
        return "failed";
    }

    let a, b, c, alpha, beta;
    const toRad = (deg) => deg * (Math.PI / 180); 
    const toDeg = (rad) => rad * (180 / Math.PI); 

   
    const data = {};
    data[type1] = val1;
    data[type2] = val2;

    try {
        
        if (data.hasOwnProperty('leg') && data.hasOwnProperty('hypotenuse')) {
            a = data['leg'];
            c = data['hypotenuse'];
            if (a >= c) throw "Катет не може бути більшим за гіпотенузу"; [cite: 38]
            b = Math.sqrt(c * c - a * a);
            alpha = toDeg(Math.asin(a / c));
            beta = 90 - alpha;
        } 
        
        else if (Object.keys(data).filter(t => t === 'leg').length === 2 || (type1 === 'leg' && type2 === 'leg')) {
            
            a = val1;
            b = val2;
            c = Math.sqrt(a * a + b * b);
            alpha = toDeg(Math.atan(a / b));
            beta = 90 - alpha;
        }
        
        else if (data.hasOwnProperty('leg') && data.hasOwnProperty('adjacent angle')) {
            a = data['leg'];
            beta = data['adjacent angle'];
            if (beta >= 90) throw "Кут повинен бути гострим"; [cite: 38]
            c = a / Math.cos(toRad(beta));
            b = Math.sqrt(c * c - a * a);
            alpha = 90 - beta;
        }
        
        else if (data.hasOwnProperty('leg') && data.hasOwnProperty('opposite angle')) {
            a = data['leg'];
            alpha = data['opposite angle'];
            if (alpha >= 90) throw "Кут повинен бути гострим"; [cite: 38]
            c = a / Math.sin(toRad(alpha));
            b = Math.sqrt(c * c - a * a);
            beta = 90 - alpha;
        }
        
        else if (data.hasOwnProperty('hypotenuse') && data.hasOwnProperty('angle')) {
            c = data['hypotenuse'];
            alpha = data['angle'];
            if (alpha >= 90) throw "Кут повинен бути гострим"; [cite: 38]
            a = c * Math.sin(toRad(alpha));
            b = c * Math.cos(toRad(alpha));
            beta = 90 - alpha;
        }
        else {
            console.log("Помилка: Неправильні типи або комбінація. Перечитайте інструкцію."); [cite: 37]
            return "failed";
        }

        
        console.log(`a = ${a}`);
        console.log(`b = ${b}`);
        console.log(`c = ${c}`);
        console.log(`alpha = ${alpha}`);
        console.log(`beta = ${beta}`);
        return "success"; [cite: 37]

    } catch (e) {
        console.log(e);
        return "failed";
    }
}
