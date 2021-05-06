/**
* Представим, что на одном из проектов нам потребовался DSL для решения бизнес-задачи. Наши пользователи - большие поклонники Lisp, поэтому синтаксис этого языка им более привычен, чем синтаксис JS.
* Парсер оригинального синтаксиса Lisp нам написать хоть и не так сложно, но все же для MVP это может быть неразумно, а вот простенький интерпретатор нам точно будет полезен.
*
* Что мы хотим получить:
* 1. Возможность объявлять функции таким образом: [defn, 'funcName', ['a', 'b'], ['sum', 'a', 'b']], где
*      defn - ключевое слово для определения функции
*      'funcName' - имя функции
*      ['a', 'b'] - перечисление аргументов функции
*      ['sum', 'a', 'b'] - тело функции (т. е. вызов функции sum с аргументами a и b)
* 2. Соответственно вызов функции должен быть таким ['funcName', 'a', 'b']
*
* Ниже уже реализован некоторый runtime и есть пример вызова interpret. Необходимо имплементировать interpret и defn.
* 
* P.S.
* Даже если не получится выполнять задание в полной мере (например, где-то застряли), все равно скидывайте в качестве решения то, что получилось.
*/

const defn = f => f

const interpret = (...code) => {
    self = this
    let result = 0
    code.forEach(codeLine => {
        if (typeof codeLine[0] === 'function' && codeLine[0].name == 'defn') {
            const [defn, name, args, fn] = codeLine
            self[name] = defn(fn[0])
        }
        if (typeof codeLine[0] === 'string') {
            const fnName = codeLine[0]
            const args = codeLine.splice(1, codeLine.length)
            result = self[fnName](...args)
        }
    })
    return result
}

// Функция, используемая в runtime
const sum = (...args) => args.reduce((prev, curr) => prev + curr)

// Пример вызова функции interpret
let result = interpret(
    [defn, "sum3", ['a', 'b', 'c'], [sum, 'a', 'b', 'c']],
    ['sum3', 10, 20, 30]
)

console.log(result)
console.assert(result === 60)