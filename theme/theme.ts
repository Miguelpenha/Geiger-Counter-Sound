import { Itheme, ThemeNameType } from '../types'

export const dark: Itheme = {
    name: 'dark',
    backgroundColor: '#061404',
    secondary: '#88b08e',
    secondaryColor: '#88b08e',
    primary: '#43f546',
    color: '#dcffdd',
    backgroundColorSecondary: '#13350e'
}

export const light: Itheme = {
    name: 'light',
    backgroundColor: '#e8f5e9',
    secondary: '#88b08e',
    secondaryColor: '#88b08e',
    primary: '#43f546',
    color: '#e8f2f5',
    backgroundColorSecondary: '#c7e2c9'
}

export default {
    [ThemeNameType.dark]: dark,
    [ThemeNameType.light]: light
}