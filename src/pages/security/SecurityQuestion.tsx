import { useSecurityCtx } from ".";

const SecurityQuestion = () => {
  const ctx = useSecurityCtx();
  console.log(ctx);
  return (
    <div>
      <div>Security Question</div>
    </div>
  )
};

export default SecurityQuestion;