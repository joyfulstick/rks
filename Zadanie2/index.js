const dane = [
  {
    numerPelny: 'F1',
    miesiac: 1,
    rok: 2018,
    data: '2018-01-01',
    pozycje: [
      { kwota: 111.11, symbol: 'XXX' },
      { kwota: 222.22, symbol: 'YYY' },
      { kwota: 333.33, symbol: 'ZZZ' }
    ]
  },
  {
    numerPelny: 'F2',
    miesiac: 1,
    rok: 2018,
    data: '2018-01-11',
    pozycje: [
      { kwota: 111.11, symbol: 'XXX' },
      { kwota: 222.22, symbol: 'YYY' },
      { kwota: 333.33, symbol: 'ZZZ' }
    ]
  },
  {
    numerPelny: 'F3',
    miesiac: 1,
    rok: 2018,
    data: '2018-01-21',
    pozycje: [
      { kwota: 111.11, symbol: 'XXX' },
      { kwota: 222.22, symbol: 'YYY' },
      { kwota: 333.33, symbol: 'ZZZ' }
    ]
  },
  {
    numerPelny: 'F4',
    miesiac: 7,
    rok: 2018,
    data: '2018-07-28',
    pozycje: [
      { kwota: 111.11, symbol: 'XXX' },
      { kwota: 222.22, symbol: 'YYY' },
      { kwota: 333.33, symbol: 'Z2Z' }
    ]
  },
  {
    numerPelny: 'F5',
    miesiac: 1,
    rok: 2019,
    data: '2019-01-01',
    pozycje: [
      { kwota: 111.11, symbol: 'XXX' },
      { kwota: 222.22, symbol: 'YYY' },
      { kwota: 333.33, symbol: 'ZZZ' }
    ]
  }
]

const aggregateData = (dataArr, category, key, value) => {
  const keysArr = Array.from(dane.map(el => el[category].map(e => e[key])))
    .reduce((prev, curr) => prev.concat(curr))
    .filter((el, i, arr) => arr.indexOf(el) === i)

  const valuesArr = dataArr.reduce(
    (acc1, curr1) =>
      Object.entries(curr1)
        .filter(([k, v]) => k === category)
        .reduce(
          (acc2, [k, v]) =>
            v.reduce(
              (acc3, curr3) =>
                acc3.map(
                  (el, i) =>
                    (el += curr3[key] === keysArr[i] ? curr3[value] : 0)
                ),
              acc2
            ),
          acc1
        ),
    keysArr.map(el => 0)
  )

  const result = {}

  keysArr.forEach((el, i) => (result[el] = valuesArr[i]))

  return result
}

console.log(aggregateData(dane, 'pozycje', 'symbol', 'kwota'))
// {XXX: 555.55, YYY: 1111.1, ZZZ: 1333.32, Z2Z: 333.33}

const filterData = (dataArr, category, from, to) =>
  dataArr.filter(el => el[category] >= from && el[category] <= to)

console.log(filterData(dane, 'data', '2018-01-10', '2018-01-30'))
// {numerPelny: "F2", miesiac: 1, rok: 2018, data: "2018-01-11", pozycje: Array(3)}
// {numerPelny: "F3", miesiac: 1, rok: 2018, data: "2018-01-21", pozycje: Array(3)}

const sortData = (dataArr, firstCat, secondCat) =>
  [...dataArr].sort(
    (a, b) => b[firstCat] - a[firstCat] || b[secondCat] - a[secondCat]
  )

console.log(sortData(dane, 'rok', 'miesiac'))
// {numerPelny: "F5", miesiac: 1, rok: 2019, data: "2019-01-01", pozycje: Array(3)}
// {numerPelny: "F4", miesiac: 7, rok: 2018, data: "2018-07-28", pozycje: Array(3)}
// {numerPelny: "F1", miesiac: 1, rok: 2018, data: "2018-01-01", pozycje: Array(3)}
// {numerPelny: "F2", miesiac: 1, rok: 2018, data: "2018-01-11", pozycje: Array(3)}
// {numerPelny: "F3", miesiac: 1, rok: 2018, data: "2018-01-21", pozycje: Array(3)}
