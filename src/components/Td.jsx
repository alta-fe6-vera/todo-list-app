import React from "react";

import { FaPencilAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const Td = (props) => {
  return (
    <tr>
      <td className="px-4 py-4">{props.content}</td>
      <td className="px-4 py-4">{props.completed}</td>
      <td className="px-2 py-4 text-center text-blue-600">
        <button onClick={props.onClickCompleted}>
          <FaCheck />
        </button>
      </td>
      <td className="px-2 py-4 text-center text-yellow-900">
        <button onClick={props.onClickEdit}>
          <FaPencilAlt />
        </button>
      </td>
      <td className="px-2 py-4 text-center text-red-600">
        <button onClick={props.onClickDel}>
          <FaTimes />
        </button>
      </td>
    </tr>
  );
};

export { Td };
