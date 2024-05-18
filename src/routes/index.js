// Layout

import HeaderOnly from '~/Layout/HeaderOnly';
import Signin from '~/Pages/Signin';
import Signon from '~/Pages/Signon';
import Home from '~/Pages/Home';
import Porofile from '~/Pages/Porofile';
import Follow from '~/Pages/Follow';
import Menu from '~/Pages/Menu';
import History from '~/Pages/History';
import Hot from '~/Pages/Hot';
import Chapter from '~/Pages/Chapter';
import ComicBookCover from '~/Pages/ComicBookCover';
import SearchResult from '~/Pages/SearchResult';

import Theloai from '~/Pages/Theloai';
import SelectFilter from '~/Pages/SelectFilter';

//public routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/:theloai',
        component: Theloai,
        layout: HeaderOnly,
    },
    {
        path: '/searchresult/:search',
        component: SearchResult,
        layout: HeaderOnly,
    },
    {
        path: '/chonloc',
        component: SelectFilter,
        layout: HeaderOnly,
    },

    {
        path: '/comicbookcover/:name', // Dynamic path for ComicBookCover
        component: ComicBookCover,
        layout: HeaderOnly,
    },
    {
        path: '/comicbookcover/:name/:chap',
        component: Chapter,
        layout: HeaderOnly,
    },
    {
        path: '/hot',
        component: Hot,
    },
    {
        path: '/lichsu',
        component: History,
    },
    {
        path: '/profile/:theloai',
        component: Porofile,
    },
    {
        path: '/theodoi',
        component: Follow,
    },
    {
        path: '/menu',
        component: Menu,
        layout: HeaderOnly,
    },
    {
        path: '/signin',
        component: Signin,
        layout: null,
    },
    {
        path: '/signon',
        component: Signon,
        layout: null,
    },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
