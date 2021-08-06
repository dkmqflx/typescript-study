{
  // 많이 사용된다

  type ToDo = {
    title: string;
    description: string;
    label: string;
    priority: "high" | "low";
  };

  // ToDo를 업데이트 하는 함수
  // Partial 쓰면 부분적인 것들만 받을 수 있다
  function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
    return { ...todo, ...fieldsToUpdate };
  }

  const todo: ToDo = {
    title: "learn TS",
    description: "study Hard",
    label: "study",
    priority: "high",
  };

  const updated = updateTodo(todo, { priority: "low" });
  console.log(updated);
}
