Тестовое задание


Нужно сделать SPA приложение, используя стек Webpack, React, TypeScript, Canvas и архитектуру Flux (любая ее реализация на ваш вкус).

Приложение должно состоять из двух экранов – Текущие сделки и Добавление сделки.
В качестве API предлагается написать небольшой бэкэнд API на NodeJS (Express). В качестве БД на бэкенде можно воспользоваться например Lowdb (https://github.com/typicode/lowdb) или любой другой.

Текущие сделки (экран 1)

Экран состоит из 3 функциональных частей:
1.	График сделок
2.	Таблица сделок
3.	Кнопка New Deal

Обе отображают одну и ту же модель данных:

Interface Deal {
	id: number
	date: Date,
	value: number
}

Данные нужно брать из реализованного вами API.
График нужно нарисовать без применения библиотек на Canvas.
График всегда должен показывать последние 10 минут.
По нажатию New Deal открывается экран добавления сделки.
По нажатию крестика в таблице сделка удаляется.

Добавление сделок (экран 2)

Тут должна отображаться форма добавления сделки, Current date как и в заголовке на остальных страницах должна перерисовываться на основании текущей даты пользователя. Value пользователь вводит сам.

По нажатию показываем и анимируем блок подтверждения и даем кнопку OK, которая возвращает нас на экран текущих сделок.