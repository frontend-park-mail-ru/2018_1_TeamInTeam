'use strict';

import MainComponent from '../../components/MainComponent/MainComponent.js';
import Block from '../../components/Block/Block.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import Pagination from '../../components/Pagination/Pagination.js';

export default class SignIn extends MainComponent {
    constructor() {
        super('table', ['menu'], {});
    }

    build() {
        let users = {'users': [
                {
                    'email': 'arthurunique24@gmail.com',
                    'name': 'Arthur',
                    'score': '15000',
                },
                {
                    'email': 'bigPapa@gmail.com',
                    'name': 'Papa',
                    'score': '100500',
                },
                {
                    'email': 'master@gmail.com',
                    'name': 'master',
                    'score': '125000',
                },
                {
                    'email': 'lol@mail.ru',
                    'name': 'Lol',
                    'score': '100',
                },
            ]};

        const usersTable = new Block('p', this.pagination(users, 0, 2), ['menu-input'], {});
        this.append(usersTable.render());
        this.append((new Pagination(2, {style: 'margin-top: 60px', id: 'leaderboardpagination'}).render()));
        document.getElementById('main').appendChild(this.render());

        const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

        const page = document.querySelector('.pagination');
        page.addEventListener('click', (event) => {
            let currentPage = 1;

            if (isNumeric(event.srcElement.textContent)) {
                page.querySelector('.active').classList.remove('active');
                event.srcElement.setAttribute('class', 'active');
                currentPage = event.srcElement.textContent
            } else {
                if (event.srcElement.textContent === '<<') {
                    const activePage = page.querySelector('.active').textContent;
                    if (activePage - 1 !== 0) {
                        page.querySelector('.active').classList.remove('active');
                        page.querySelectorAll('a')[activePage - 1].setAttribute('class', 'active');
                        currentPage = activePage - 1;
                    }
                }
                if (event.srcElement.textContent === '>>') {
                    const activePage = page.querySelector('.active').textContent;
                    if (parseInt(activePage) + 1 !== 3) {
                        page.querySelector('.active').classList.remove('active');
                        page.querySelectorAll('a')[parseInt(activePage) + 1].setAttribute('class', 'active');
                        currentPage = parseInt(activePage) + 1;
                    } else {
                        currentPage = parseInt(activePage);
                    }
                }
            }

            usersTable.innerHTML(this.pagination(users, currentPage - 1, 2));
        });
    }

    pagination(users, page, countOf) {
        const usersOnPage = {'users': []};
        usersOnPage.users = users.users.slice(page * countOf, countOf + page * countOf);

        const template = Hogan.compile('{{#users}}-{{name}}! - {{score}}<br/> {{/users}}');
        const output = template.render(usersOnPage);

        return output;
    }
}
