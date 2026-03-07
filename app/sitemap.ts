import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://turing-usp.com",
            lastModified: new Date(),
            priority: 1.0,
        },
        {   
            url: "https://turing-usp.com/projetos",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turing-usp.com/contato",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turing-usp.com/equipe",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turing-usp.com/turing-talks",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turing-usp.com/eventos",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turing-usp.com/cadastre-se",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turing-usp.com/login",
            lastModified: new Date(),
            priority: 0.8,
        }
    ];
}