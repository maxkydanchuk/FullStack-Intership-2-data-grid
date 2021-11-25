let dataCopy = [];



class NobelPrize extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        const getResource = async (url) => {
            const res = await fetch(url);
        
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status ${res.status}`);
            }

            ;
            return await res.json();
        };

        getResource('http://api.nobelprize.org/v1/prize.json')
        .then((data) => {
            dataCopy = data.prizes;
            console.log(dataCopy)
        })
            dataCopy.forEach(({year, category, laureates}) => {
                if (laureates) {
                    laureates.forEach(({firstname, surname}) => {
                        if (surname === undefined) {
                            surname = '';
                        }
                        if (firstname === undefined) {
                            firstname = '';
                        }

                        const row = document.createElement('div');
                        row.setAttribute('class', 'table__row');
                        const rowYear = document.createElement('span');
                        rowYear.setAttribute('class', 'table__row_year');
                        const rowCategory = document.createElement('span');
                        rowCategory.setAttribute('class', 'table__row__category');
                        const rowFirstname = document.createElement('span');
                        rowFirstname.setAttribute('class', 'table__row__firstname');
                        const rowLastname = document.createElement('span');
                        rowLastname.setAttribute('class', 'table__row__lastname');
                        const rowFullname = document.createElement('span');
                        rowFullname.setAttribute('class', 'table__row__fullname');

                        rowYear.innerHTML = year;
                        rowCategory.innerHTML = category;
                        rowFirstname.innerHTML = firstname;
                        rowLastname.innerHTML = surname;
                        rowFullname.innerHTML = `${firstname} ${surname}`
                        
                        row.appendChild(rowYear);
                        row.appendChild(rowCategory);
                        row.appendChild(rowFirstname);
                        row.appendChild(rowLastname);
                        row.appendChild(rowFullname);
                        
                        shadowRoot.appendChild(row);
                    })
                }
            })
    } 
}


customElements.define('nobel-prize', NobelPrize);
