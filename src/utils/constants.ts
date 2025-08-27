export enum Directions {
    RTL = "rtl",
    LTR = "ltr",
}

export enum Languages {
    ENGLISH = "en",
    ARABIC = "ar",
}

export const SUPPORTED_LANGUAGES = [Languages.ENGLISH, Languages.ARABIC];

export enum Routes {
    ROOT = "/",
    PROJECTS = "projects",
    PROJECT = "project",
    SKILLS = "skills",
    CONTACT = "contact",
    DASHBOARD = "dashboard",
    NEW = "new",
    EDIT = "edit",
    DELETE = "delete",
    CV = "https://drive.google.com/file/d/1JhjRJ1ybmVu0Zh-7-4qreSpxMQO28Q8e/view?usp=sharing",
    LINKEDIN = "https://www.linkedin.com/in/abdalla-atef/",
    GITHUB = "https://github.com/Abdalla-0",
    LOGIN = "login",
}

export enum Methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export enum Environments {
    PROD = "production",
    DEV = "development",
}