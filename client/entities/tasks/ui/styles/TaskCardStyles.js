import { xcss } from "@atlaskit/primitives";
export const containerStyles = (isCompleted) =>
  xcss({
    display: "flex",
    width: "100%",
    marginBottom: "25px",
    flexDirection: "column",
    backgroundColor: isCompleted
      ? "color.background.success"
      : "elevation.surface.raised",
    padding: "space.150",
    transition: "200ms",
    borderRadius: "border.radius.100",
    boxShadow: "elevation.shadow.raised",
  });

export const inlineStyles = xcss({
  display: "flex",
  alignItems: "center",
});

export const extraInfoStyles = xcss({
  display: "flex",
  justifyContent: "space-between",
  paddingBlock: "space.050",
});
