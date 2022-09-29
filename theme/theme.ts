import { Itheme, ThemeNameType } from '../types'

export const dark: Itheme = {
    name: 'dark',
    backgroundColor: '#0a192f',
    secondary: '#8892b0',
    secondaryColor: '#8892b0',
    primary: '#43cdf5',
    color: '#dce3ff',
    backgroundColorSecondary: '#0f2749'
}

export const light: Itheme = {
    name: 'light',
    backgroundColor: '#e8f2f5',
    secondary: '#8892b0',
    secondaryColor: '#8892b0',
    primary: '#43cdf5',
    color: '#e8f2f5',
    backgroundColorSecondary: '#dbe4e7'
}

export default {
    [ThemeNameType.dark]: dark,
    [ThemeNameType.light]: light
}