import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями

    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {   
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                        let option = document.createElement('option');
                        option.value = name
                        option.textContent = name
                        return option                          // @todo: создать и вернуть тег опции
                      })
        )
     })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля


        if (action && action.name === 'clear') {
            let parentElement = action.parentElement
            let inputElement = parentElement.querySelector('.input')
            inputElement.value = ''
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
            state[action.dataset.field] = ''

        }

        const totalFrom = parseFloat(state.totalFrom) || undefined;
        const totalTo = parseFloat(state.totalTo) || undefined;

        if (totalFrom !== undefined || totalTo !== undefined) {
        state.total = [totalFrom, totalTo];
        }

        delete state.totalFrom;
        delete state.totalTo;

        console.log(data)
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
        // return data;
    }
}