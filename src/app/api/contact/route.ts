import { sendEmail } from "@/Service/email";
import * as yup from "yup";

const bodySchema = yup.object().shape({
  email: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

export async function POST(request: Request) {
  const body = await request.json();
  if (!bodySchema.isValidSync(body)) {
    return new Response(
      JSON.stringify({ message: "메일을 보내지 못하였습니다. 😢" }),
      { status: 400 }
    );
  }

  return sendEmail(body)
    .then(
      () =>
        new Response(JSON.stringify({ message: "메일을 보냈습니다. 😀" }), {
          status: 200,
        })
    )
    .catch((error) => {
      return new Response(
        JSON.stringify({ message: "메일을 보내지 못하였습니다. 😢" }),
        { status: 500 }
      );
    });
}
