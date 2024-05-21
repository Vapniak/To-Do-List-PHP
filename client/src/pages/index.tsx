import ColorSchemeSwitch from "@/components/ColorSchemeSwitch";
import { axiosInstance } from "@/httpCommon";
import { Task } from "@/types/task";
import {
  ActionIcon,
  Affix,
  AppShell,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  List,
  Paper,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  rem,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IconBase } from "react-icons";
import {
  IoAdd,
  IoCheckbox,
  IoCheckmark,
  IoClose,
  IoTrashBin,
} from "react-icons/io5";
import { MdCheckBox } from "react-icons/md";

import { isNotEmpty, useForm } from "@mantine/form";

// TODO: add task and background for taks comp

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    updateTasks();
  }, []);

  const updateTasks = () => {
    axiosInstance.get("").then((res) => {
      setTasks(res.data);
    });
  };

  const changeStatus = (id: number, status: number) => {
    axiosInstance.put("", null, { params: { id, status } }).then((res) => {
      updateTasks();
    });
  };

  const deleteTask = (id: number) => {
    axiosInstance.delete("", { params: { id } }).then((res) => {
      updateTasks();
    });
  };

  const addTask = (task: string) => {
    axiosInstance.post("", null, { params: { task } }).then((res) => {
      updateTasks();
    });
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      task: "",
    },
    validate: {
      task: isNotEmpty("Task is required"),
    },
  });

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 40 }}>
      <AppShell.Header>
        <Group h={"100%"} align="center" justify="space-between" px={"xl"} grow>
          <Box />
          <Flex justify={"center"}>
            <Title>To-Do List</Title>
          </Flex>
          <Flex justify={"end"}>
            <ColorSchemeSwitch />
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container size={"sm"}>
          <Center pt={"md"}>
            <Flex direction={"column"} gap={"md"} w={"100%"} h={"100%"}>
              <Group p="md">
                <ActionIcon
                  size={"lg"}
                  onClick={() => {
                    if (form.isValid()) {
                      addTask(form.getValues().task);
                    }
                  }}
                >
                  <IoAdd size={"70%"} />
                </ActionIcon>
                <TextInput
                  placeholder="Do some task..."
                  flex={1}
                  key={form.key("task")}
                  {...form.getInputProps("task")}
                />
              </Group>
              {tasks.map((value) => {
                const isDone = value.status == 1;
                return (
                  <Paper key={value.id} p={"md"} radius={"md"}>
                    <Group wrap="nowrap">
                      <ActionIcon
                        size={"lg"}
                        variant="subtle"
                        color={isDone ? "green" : "red"}
                        onClick={() => changeStatus(value.id, isDone ? 0 : 1)}
                      >
                        {isDone ? (
                          <IoCheckmark size={"70%"} />
                        ) : (
                          <IoClose size={"70%"} />
                        )}
                      </ActionIcon>
                      <Divider orientation="vertical" />
                      <Text
                        size="lg"
                        flex={1}
                        style={{ wordBreak: "break-word" }}
                        td={isDone ? "line-through" : ""}
                      >
                        {value.task}
                      </Text>
                      <Divider orientation="vertical" />
                      <ActionIcon
                        variant="light"
                        size={"lg"}
                        color="red"
                        onClick={() => deleteTask(value.id)}
                      >
                        <IoTrashBin size={"70%"} />
                      </ActionIcon>
                    </Group>
                  </Paper>
                );
              })}
            </Flex>
          </Center>
        </Container>
      </AppShell.Main>
      <AppShell.Footer>
        <Group h={"100%"} align="center" justify="center">
          <Text>Oliwier Adamczyk</Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
