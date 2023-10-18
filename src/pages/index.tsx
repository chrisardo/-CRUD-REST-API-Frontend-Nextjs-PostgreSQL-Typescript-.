import { GetServerSideProps } from "next";
import { Button, Grid } from "semantic-ui-react";
import { Layout } from "src/components/Layout"; //importamos el componente Layout
import { BiTaskX } from 'react-icons/bi';
import { TaskList } from "src/components/tasks/TaskList";
import { useRouter } from "next/router"; //hook de nextjs que nos permite hacer redirecciones
import { Task } from "src/interfaces/Tasks"; //importamos la interface de las tareas

interface Props { //interface para definir los props que se le pasan al componente
    tasks: Task[];
}

//const Home = ({ tasks }: Props) => {
export default function Home({ tasks }: Props) {
    const { push } = useRouter();//hook de nextjs que nos permite hacer redirecciones
    return (
        <Layout>
            {tasks.length === 0 ? ( //si no hay tareas, se muestra un mensaje
                <Grid
                    columns={3}
                    centered
                    verticalAlign="middle"
                    style={{ height: "70%" }}
                >
                    <Grid.Row>
                        <Grid.Column>
                            <div style={{ color: "#eee", textAlign: "center" }}>
                                <BiTaskX size="15rem" />
                                <h1>No tasks yet</h1>
                                <Button onClick={() => push("/tasks/new")}>Create one</Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            ) : ( //si hay tareas, se le pasa el array de tareas al componente TaskList
                <TaskList tasks={tasks} />
            )}
        </Layout>
    );
};
//Nos permite poder ejecutar codigo backend con una consulta api, una vez termine se le pasa como un objeto que vendrias ser los props del fronted
export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch("http://localhost:3000/api/tasks");//fetch es una funcion de js que nos permite hacer peticiones http
    const tasks = await res.json();//res.json() es una funcion de js que nos permite convertir el resultado de la peticion a un json
    return {//retornamos un objeto con los props que queremos pasar al componente
        props: { tasks },//tasks es un array de objetos
    };
};

//export default Home;