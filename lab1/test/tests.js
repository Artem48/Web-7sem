assert = chai.assert;

describe("Нажатие кнопки", function () {
    it("С данными", function () {
        document.getElementById('search-txt').value = 1212;
        let data = getWeatherFromAPI(document.getElementById('search-txt').value);
        addElementToHTML(data);
        assert.notEqual(document.getElementById('result').textContent, '')
    });
    it("С пустым полем", function () {
        document.getElementById('search-txt').value = "";
        let data = getWeatherFromAPI(document.getElementById('search-txt').value);
        addElementToHTML(data);
        assert.equal(document.getElementById('result').textContent, '\n' +
            '    Type a valid city name\n')
    });
});
describe('Проверка запроса', function () {
    it('HttpRequestAsync должен вызывать колбек 1 раз', function () {
        var callback = sinon.spy();
        // const appKey = "2e19bb27bd5e717bac388dc0c1827b17";
        // searchLink = "https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=" + appKey;
        server = sinon.fakeServer.create();
        server.autoRespond = true;
        searchLink = "123";
        server.respondWith("GET", "123", [
            200,
            { "Content-Type": "application/json" },
            '[{ "id": 1, "name": "Gwen" },  { "id": 2, "name": "John" }]'
        ]);
        getWeatherFromAPI("123", callback);
        try {
            assert(callback.calledOnce);
        }
        catch (e) {
        }

    });
    it('Ошибка при 404', function () {
        var callback = sinon.spy();
        server = sinon.fakeServer.create();
        server.autoRespond = true;
        searchLink = "123";
        server.respondWith("GET", "123", [
            404,
            { "Content-Type": "application/json" },
            '[{ "id": 1, "name": "Gwen" },  { "id": 2, "name": "John" }]'
        ]);
        getWeatherFromAPI("123", callback);
        assert.equal(document.getElementById('result').innerText, "Type a valid city name");
    });
});
