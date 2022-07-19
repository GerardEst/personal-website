export const pairs = [
    // Iniciales : algoritmos, redes, bases de datos

    // Algorithm
    {
        'parents': ['algorithm','network'],
        'child': 'http'
    },
    {
        'parents': ['algorithm','database'],
        'child': 'sql'
    },
    {
        'parents': ['algorithm','algorithm'],
        'child': 'programming'
    },

    // Network
    {
        'parents': ['network','database'],
        'child': 'cloud'
    },
    {
        'parents': ['network','network'],
        'child': 'www'
    },

    // Database
    {
        'parents': ['database','database'],
        'child': 'big data'
    },

    // big data, www, programming, sql, http, cloud / database, algorithm, network

    {
        'parents': ['http','www'],
        'child': ''
    },




    {
        'parents': ['http','html'],
        'child': 'website'
    },

]