
class Table {
    table;
    result;

    Table(moves) {
        this.table = moves.reduce((columns, yourMove, i, a) => {
            columns[yourMove] = a.reduce((rows, compMove) => {
                let centre = this.toCenter(a.slice(), yourMove);
                let indexCompMove = centre.indexOf(compMove);
                rows[compMove] = yourMove == compMove ? 'draw' : indexCompMove < Math.floor(a.length / 2) ? 'lose' : 'win';

                return rows;
            }, {});
            return columns;
        }, {});

    }
    toCenter(elements, element) {
        while(elements.indexOf(element) != Math.floor(elements.length / 2)) {
            elements.unshift(elements.pop());
        }
        return elements;
    }
    Result(yourMove, compMove) {

        this.result = this.table[yourMove][compMove];
    }
}

module.exports = Table;

