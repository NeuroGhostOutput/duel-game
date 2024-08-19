## Test Task Duel Game

Реализованная задача Игра Дуэль магов.

— Есть прямоугольное поле Canvas, на прямоугольном поле расположены фигуры — два круга. Круги представляют собой героев, которые сражаются друг с другом.
— Герои двигаются по прямой вверх и вниз на противоположных сторонах экрана (как биты в арканоиде). По достижении края поля герой отталкивается и меняет направление движения.
— Герои пользуются заклинаниями — стреляют друг в друга шариками поменьше.
— Если герой встречает на своем пути курсор мыши, то он отталкивается от него как от границы поля
— При соприкосновении с врагом, заклинание исчезает, а на табло засчитывается одно попадание.
— Поле прямоугольное, выйти за границы нельзя
— Если на героя кликнуть, то появляется менюшка, выполненная с помощью React, с помощью которой можно поменять цвет заклинаний, которые он кидает

Для каждого героя есть два ползунка, которые настраивают частоту его стрельбы и скорость передвижения.

Реализация выполнена на чистом канвасе и реакте, без использования сторонних графических или игровых библиотек.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
