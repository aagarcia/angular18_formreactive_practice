export interface Pais {
    flags: Flags;
    name:  Name;
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: NativeName;
}

export interface NativeName {
    eng: Eng;
}

export interface Eng {
    official: string;
    common:   string;
}
