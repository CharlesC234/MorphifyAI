"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import ImageLayout from "@/components/ImageLayout";
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";


export default function legal() {
    return <div class="container h-fit">
        <div class="flex-row mt-5">
            <div class="col-3">
                <div class="flex-column">
                <button  data-toggle="button"
                style={{paddingLeft: 17.5, fontWeight: '700', paddingRight: 17.5, paddingBottom: 7.5, paddingTop: 7.5, borderRadius: 10}}
                class={`mb-2 whitespace-nowrap flex bg-zinc-800 hover:bg-zinc-700 active:bg-black focus:outline-none focus:text-black focus:bg-pink-500 
                `}>Policy Privacy</button>
                <button  data-toggle="button"
                style={{paddingLeft: 17.5, fontWeight: '700', paddingRight: 17.5, paddingBottom: 7.5, paddingTop: 7.5, borderRadius: 10}}
                class={`mb-2 whitespace-nowrap flex bg-zinc-800 hover:bg-zinc-700 active:bg-black focus:outline-none focus:text-black focus:bg-pink-500 
                `}>Terms Of Service</button>
                <button  data-toggle="button"
                style={{paddingLeft: 17.5, fontWeight: '700', paddingRight: 17.5, paddingBottom: 7.5, paddingTop: 7.5, borderRadius: 10}}
                class={`whitespace-nowrap flex bg-zinc-800 hover:bg-zinc-700 active:bg-black focus:outline-none focus:text-black focus:bg-pink-500 `}>
                Cookies</button>
                </div>
            </div>
            <div class="col-9"></div>
        </div>
    </div>
}