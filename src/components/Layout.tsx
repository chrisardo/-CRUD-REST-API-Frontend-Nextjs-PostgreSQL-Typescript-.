import { Container } from "semantic-ui-react";
import { Navbar } from "./NavBar";
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { title } from 'process';
import { NextPage } from 'next';
export const Layout = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => {
    return (
        <div className='container'>
            <Head>
                <title>NextJS: Consumiendo Api</title>
                <Link rel='icon' href='/img/icono.jpg' />
            </Head>

            <Navbar />

            <main
                style={{
                    backgroundColor: "#212121",
                }}
            >
                <Container
                    style={{
                        paddingTop: "2rem",
                        height: "90vh",
                    }}
                >
                    <Image
                        src="/img/icono.jpg" // Route of the image file
                        height={244} // Desired size with correct aspect ratio
                        width={344} // Desired size with correct aspect ratio
                        alt="Your Name"
                    />
                    <h2 style={{
                        color: "white",
                    }}>
                        Lista de tareas registrados en la base de datos:
                    </h2>
                    {children}
                </Container>
            </main>
        </div>
    );
};