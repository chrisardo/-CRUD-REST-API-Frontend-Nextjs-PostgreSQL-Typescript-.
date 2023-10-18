import { Layout } from "src/components/Layout";
import { Card, Form, Grid, Button, Icon, Confirm } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task } from "src/interfaces/Tasks";//importamos la interface de las tareas

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>; //definimos el tipo de dato que va a recibir el evento

const inititalState = { //estado inicial de la tarea
    title: "",
    description: "",
};

const NewPage = (): JSX.Element => {
    const [task, setTask] = useState<Task>(inititalState);
    const [loading, setLoading] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const router = useRouter();

    const createTask = async (task: Task) =>//funcion para crear una tarea
        await fetch("http://localhost:3000/api/tasks", { //fetch es una funcion de js que nos permite hacer peticiones http
            method: "POST",//enviamos la peticion por el metodo post
            body: JSON.stringify(task),//Convertir el bojeto a un string de json
            headers: {
                "Content-Type": "application/json",
            },
        });

    const updateTask = async (id: string, task: Task) =>
        await fetch("http://localhost:3000/api/tasks/" + id, {
            method: "PUT", //actualizamos la tarea por el metodo put
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
            },
        });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {//funcion para enviar el formulario
        e.preventDefault();//evitamos que se recargue la pagina

        setLoading(true);
        try {
            if (typeof router.query.id === "string") { //si existe el id en la url y es un string
                updateTask(router.query.id, task); //actualizamos la tarea
            } else {
                createTask(task); //creamos la tarea
            }
            setTask(inititalState); //reseteamos el estado de la tarea
            router.push("/"); //redireccionamos a la pagina principal
        } catch (error) {
            console.log(error);
        }
        setLoading(false); //reseteamos el estado del loading 
    };

    const handleChange = ({ target: { name, value } }: ChangeInputHandler) => //destructuramos el evento
        setTask({ ...task, [name]: value }); //actualizamos el estado de la tarea

    const loadTask = async (id: string) => {
        const res = await fetch("http://localhost:3000/api/tasks/" + id);
        const task = await res.json();
        setTask({ title: task.title, description: task.description });
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch("http://localhost:3000/api/tasks/" + id, {
                method: "DELETE",
            });
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (typeof router.query.id === "string") loadTask(router.query.id); //si existe el id en la url y es un string, se carga la tarea
    }, [router.query]); //cada vez que cambie el query de la url, se ejecuta el useEffect

    return (
        <Layout>
            <Grid
                centered
                columns={3}
                verticalAlign="middle"
                style={{ height: "70%" }}
            >
                <Grid.Column>
                    <Card>
                        <Card.Content>
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Write a title"
                                        name="title"
                                        onChange={handleChange}
                                        value={task.title}
                                        autoFocus
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="description">Description:</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows={2}
                                        placeholder="Write a Description"
                                        onChange={handleChange}
                                        value={task.description}
                                    ></textarea>
                                </Form.Field>
                                {router.query.id ? ( //si existe el id en la url, se muestra el boton de actualizar
                                    <Button inverted color="green" loading={loading}>
                                        <Icon name="save" />
                                        Update
                                    </Button>
                                ) : ( //si no existe el id en la url, se muestra el boton de guardar
                                    <Button primary loading={loading}>
                                        <Icon name="save" />
                                        Save
                                    </Button>
                                )}
                            </Form>
                        </Card.Content>
                    </Card>

                    {router.query.id && ( //si existe el id en la url, se muestra el boton de eliminar
                        <Button inverted color="red" onClick={() => setOpenConfirm(true)}>
                            <Icon name="trash" />
                            Delete
                        </Button>
                    )}
                </Grid.Column>
            </Grid>
            {/* Modal de confirmacion para eliminar una tarea */}
            <Confirm
                header="Delete a Task"
                content={`Are you sure you want to delete task ${router.query.id}`}
                open={openConfirm} //si es true, se muestra el modal
                onCancel={() => setOpenConfirm(false)} //si se cancela el modal, se cierra
                onConfirm={() =>
                    typeof router.query.id === "string" && handleDelete(router.query.id) //si el tipo de dato del id es un string, se elimina la tarea
                }
            />
        </Layout>
    );
};

export default NewPage;