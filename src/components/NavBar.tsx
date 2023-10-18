import { Container, Menu, Button } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";

export const Navbar = () => {
    const router = useRouter();

    return (
        <Menu inverted attached style={{ padding: "1.5rem" }}>
            <Container>
                <Menu.Item onClick={() => router.push("/")}>
                    <Image
                        width="30"
                        height="30"
                        src="https://react.semantic-ui.com/logo.png"
                        alt="nextjs logo"
                    />

                </Menu.Item>
                <Menu.Item>
                    <h2>
                        CRUD (REST API & Frontend) con Nextjs PostgreSQL Typescript
                    </h2>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button onClick={() => router.push("/tasks/new")} primary>
                            Nueva Tarea
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    );
};