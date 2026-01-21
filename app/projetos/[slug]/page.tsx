"use client";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { projetosSimulados, Projeto } from "@/data/projetosDara";

type ProjetoSlugProps = {
    params: {
        slug: string;
    };
};

// Página server component que lê o slug da rota dinâmica
export default function ProjetoSlug({ params }: ProjetoSlugProps) {
    const projeto: Projeto | undefined = projetosSimulados.find(
        (item) => item.slug === params.slug
    );

    return (
        <div>
            <div className='fixed top-0 left-0 right-0 z-10'>
                <Navbar/>
            </div>
             
        </div>
    )
}