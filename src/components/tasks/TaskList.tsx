import { useRouter } from "next/router";
import { Card, Button, Icon, Confirm } from "semantic-ui-react";
import { Task } from "src/interfaces/Tasks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Props { //interface para definir los props que se le pasan al componente
    tasks: Task[];
}
const inititalState = { //estado inicial de la tarea
    title: "",
    description: "",
};
type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>; //definimos el tipo de dato que va a recibir el evento


export const TaskList = ({ tasks = [] }: Props) => {

    const [task, setTask] = useState<Task>(inititalState);
    const [loading, setLoading] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const router = useRouter();
    const loadTask = async (id: string) => {
        const res = await fetch("http://localhost:3000/api/tasks/" + id);
        const task = await res.json();
        setTask({ title: task.title, description: task.description });
    };
    useEffect(() => {
        if (typeof router.query.id === "string") loadTask(router.query.id);
    }, [router.query]);
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
    return (
        <Card.Group itemsPerRow={4}>
            {tasks.map((task) => ( //recorremos el array de tareas, y por cada tarea se muestra un componente Card
                <Card
                    key={task.id} //el key es un identificador unico para cada tarea
                >
                    <Card.Content>
                        <Card.Header>{task.title}</Card.Header>
                        {task.created_on && ( //si existe la fecha de creacion de la tarea, se muestra
                            <Card.Meta>
                                {new Date(task.created_on).toLocaleDateString()}
                            </Card.Meta>
                        )}
                        <Card.Description>{task.description}</Card.Description>

                    </Card.Content>
                    <div className="button-container">
                        <Button inverted color="red" onClick={() => setOpenConfirm(true)}>
                            <Icon name="trash" />
                            Eliminar
                        </Button>
                        <Button
                            inverted
                            color="blue"
                            onClick={() => router.push(`/tasks/edit/${task.id}`)}
                        >
                            <Icon name="edit" />Edita
                        </Button>
                    </div>
                </Card>
            ))}
            <Confirm
                header="Delete a Task"
                content={`Are you sure you want to delete task ${router.query.id}`}
                open={openConfirm}
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() =>
                    typeof router.query.id === "string" && handleDelete(router.query.id)
                }
            />
        </Card.Group>
    );
};