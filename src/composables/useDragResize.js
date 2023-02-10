import { useActions } from "vuex-composition-helpers/dist";

export const useDragResizeComposable = () => {
  const { editTools, editPublicTools } = useActions({
    editTools: "signLink/editTools",
    editPublicTools: "signLink/editPublicTools",
  });

  const dragEnd = (e, tool) => {
    const dragToUpdate = {
      document_id: tool?.document_id,
      document_upload_id: tool.document_upload_id,
      tool_pos_left: e.x.toString(),
      tool_pos_top: e.y.toString(),
      value: tool?.value,
    };

    if (tool.document_id == undefined) {
      editTools({ id: tool.id, payload: dragToUpdate });
    } else {
      editPublicTools({ id: tool.id, payload: dragToUpdate });
    }
  };

  const resizeEnd = (tool, w, h) => {
    const resizeToUpdate = {
      document_id: tool?.document_id,
      document_upload_id: tool.document_upload_id,
      tool_width: w.toString(),
      tool_height: h.toString(),
      value: tool?.value,
    };

    if (tool.document_id == undefined) {
      editTools({ id: tool.id, payload: resizeToUpdate });
    } else {
      editPublicTools({ id: tool.id, payload: resizeToUpdate });
    }
  };

  return {
    dragEnd,
    resizeEnd,
  }
}