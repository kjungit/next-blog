## **Static Routing - 정적 라우팅**

\- 정해진 폴더명에 맡게 path값이 결정

```
app
  ㄴ 폴더명
    ㄴ page.tsx // 페이지 명으로 폴더안에 page이름으로 만든다.
  ㄴ layout.tsx // 레이아웃 navbar 설정
```

\- navbar는 현재 같은 경로에 나타난다.

```
app
  ㄴ 폴더명
    ㄴ page.tsx // 페이지 명으로 폴더안에 page이름으로 만든다.
 	ㄴ layout.tsx // 중첩 레이아웃 navbar 설정
  ㄴ layout.tsx // 최상위 navbar
```

\- 중첩으로 나오게하려면 product/pageName 으로 진행되며, 중첩 폴더 페이지 안에 layout을 만들어줘야한다.

```
function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className={styles.nav}>
        <Link href="/products">All</Link>
        <Link href="/products/mens">mens</Link>
        <Link href="/products/womens">womens</Link>
      </nav>
      <section className={styles.product}>{children}</section>
    </>
  );
}
```

\- children을 통해서 navbar외에 컨텐츠들을 전달하여 보여준다.

---

## **Dynamic Routing - 동적 라우팅**

\- 정해진 폴더명이 아닌 달라진 item 또는 동적으로 page를 만들 수 있다.

```
app
  ㄴ폴더명
    ㄴ[slug]
      ㄴ page.tsx
```

\- \[ \] 으로 만들어진 폴더를 하게되면 상위 폴더 path에 전달되며 함수내에서 props.params를 통해 받을 수 있다..

```
type Props = {
  params: {
    slug: string
  }
}
export default function ItemPage({params}: Props) {
 return <div>{params.slug}</div>
}
```

\* 동적 라우팅은 골격은 프리렌더링이 되지만 동적인것들은 SSR서버사이드렌더링 으로 골격외에 전달받는다.

만약 모든 페이지를 동적으로 만드는것이 아니라 **특정페이지는 미리 만들어놓고싶다면?**

```
type Props {
  params: {
    slug: string;
  };
}

function Pants({ params }: Props) {
  if (params.slug === "nothing") {
    notFound();
  }
  return <div>{params.slug} 제품 설명 페이지</div>;
}

export default Pants;

export function generateStaticParams() {
  const products = ["pants", "skirt", "shoes"];
  return products.map((product) => ({
    slug: product,
  }));
}
```

\- **generateStaticParams** 함수를 통해서 slug키에 값을 지정할 수 있다.  
\- 처음 빌드부터 지정한 페이지를 서버에서 만들어두려면! 사용할 수 있다.

[##_Image|kage@bfJOZr/btshapP0Nz1/yhB2VkwHwuH5GnCI3elgLk/img.png|CDM|1.3|{"originWidth":572,"originHeight":281,"style":"alignCenter"}_##][##_Image|kage@vaOTq/btsg87byyJC/jGGKxj9VTryOkZ1FKzhwGK/img.png|CDM|1.3|{"originWidth":673,"originHeight":54,"style":"alignCenter"}_##]

\- 빌드 후 상태를 보게되면 지정해둔 페이지들은 ssg로 만들어져있는걸 볼 수 있다.

○ : 자동으로 정적으로 만들어진  
● : 자동으로 만들어졌지만 Props로 전달받아 만들어진

---

## **Layout**

```
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <h1>Demo Note</h1>
          <nav className={styles.nav}>
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
```

\- 폴더마다 만들 수 있다. 자식요소에도 공유할 수 있다. / header, navbar...

---

## **Link**

\- a태그가 아닌 next에서 제공하는 Link를 사용하면된다.  
\- Link에 마우스 커서가 가게되면 미리 해당 HTML파일을 불러와서 사용자에게 보여줄 준비를 하게된다.

---

## **SEO - 검색 엔진 최적화**

\- 각 페이지에 metadata를 지정할 수 있다.  
\- 페이지마다 metadata를 지정하지 않으면 상위 페이지를 따라서 지정된다.

```
export function generateMetadata({ params }: Props) {
  return {
    title: `${params.slug} 제품 설명`,
    description: `${params.slug} 제품에 대한 설명입니다.`,
  };
}
```

\- **generateMetadata**를 통해서 params를 받아서 지정할  수 있다.

```
export const metadata: Metadata = {
  title: "페이지에 사용할 제목",
  description: "페이지에 사용할 설명",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <h1>Demo Note</h1>
          <nav className={styles.nav}>
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
```

\- 각 페이지에 맞는 metadata를 통해서 만들 수 있다.

---

## **렌더링**

v.12 페이지 단위로 렌더링 방식 진행 ( getStaticProps(), getServerSideProps() )  
**\-> v.13 컴포넌트 단위로도 렌더링 방식을 진행**

**서버 컴포넌트**

**\-  app안에서 진행되는 것들은 모두 서버 컴포넌트**  
\- 서버에서 클라이언트로 전달되는것은 HTML파일인것을 잊지 말자.  
**\- API 또한 브라우서 API가 아닌 node API를 사용해야한다.**

**클라이언트 컴포넌트**

```
"use client";
```

\- 이렇게 파일에서 use client를 입력해주면 클라이언트 렌더링을 시킬 수 있다.

**\* 여기서 꼭 알고 넘어가야하는 것!**  
**그럼 클라이언트 렌더링은 서버에서는 만들어지는게 아니다?**

[##_Image|kage@s1LOB/btshc5pQtPr/uq1JKXYSPz9CkGScdkkUy1/img.png|CDM|1.3|{"originWidth":503,"originHeight":161,"style":"alignLeft"}_##]

\- build시에도 클라이언트 렌더링을 지정한 파일들이 실행되는걸 볼 수 있다. (체크 항목 console)  
\- 처음에는 서버  컴포넌트를 전체 실행하고 그뒤  클라이언트 컴포넌트도 실행하게 된다.

[##_Image|kage@zQ1gX/btsg25MpFRR/2bivPfKjFUMfFCWHjWkZM1/img.png|CDM|1.3|{"originWidth":1440,"originHeight":1008,"style":"alignLeft","width":500,"caption":"build한 프로젝트 실행 후 브라우저"}_##]

\- 그리고 build한 프로젝트를 실행시켜보면 클라이언트 컴포넌트도 서버 렌더링을한 HTML파일에 나타나고 있는걸 볼 수 있다.  
\- 버튼을 클릭하면 실행되지는 않는다. ( 정적 데이터 )  
\- 이걸로 **UI적인부분들은 서버렌더링이 진행되어 보내지고**  
**JS, 리액트 라이브러리와 같이 동작 관련된 코드들은 클라이언트렌더링으로 진행**되는걸 알 수 있다.  
바로 **Hydration! 리액트 컴포넌트로 다시 채워진다.**

[##_Image|kage@bhptGd/btshapoVcBr/vCMIkqs9bqL88WXBF9dthK/img.png|CDM|1.3|{"originWidth":645,"originHeight":487,"style":"alignCenter","caption":"next hompage"}_##]

**그럼 언제 사용해야할까?**

next.js 홈페이지에서 안내하는걸 참고하면 좋을것 같다.  
**\- 백엔드 리소스가 필요, 보안상 민감한 정보, 서버에 의존하고있는 무거운 동작들이라면, 서버컴포넌트를 사용하자!**  
**\- 사용자의 이벤트, react hook, 브라우저 API사용, 상태 사용이라면!? 클라이언트 컴포넌트를 사용하자!**  
페이지 전체를 클라이언트 컴포넌트를 만드는 것도 좋지않다!

---

## **ISR - Incremental Static Regeneration**

\- revalidate

```
export const revalidate = false // 기본값
// 0 : SSR처럼 요청이 올때마다

export const revalidate = 3; // 3초 마다
// number : 정한 시간만큼 ISR
```

\- **기본값이 false**로 되어있기 때문에 **SSG로 동작**하지만 **ISR로 사용할 컴포넌트**에서 **number(초단위)로 넣게되면 revalidate**가 된다.

---

## **fetch - 비동기에서 SSG, ISR, SSR**

**SSG**

```
const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");

const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
  cache: "", // 값을 비워두면 SSG
});
```

\- 한번 불러온 데이터로 서버렌더링이 진행되고 그뒤로는 변경되지 않는다.

**ISR**

```
const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
  next: {
    revalidate: 3, // 3초 마다
  },
});
```

\- next속성을 통해 revalidate를 지정하여 정해진 시간마다 데이터를 리패치시킨다.  
\- fetch를 사용하면서 revlidate를 설정해주면 SSG로 설정하더라도 정해진 시간만큼 새로 서버에서 렌더링하여 받을 수 있다.

**SSR**

```
const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
  next: {
    revalidate: 3,
  },
});

const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
  cache: "no-cache",
});
```

\- 만약 0으로 하게되면 SSR로 하는거와 똑같다.  
\- chche에서 "no-cache"를 사용하는것 또한 같다. 서버에 캐시되지않기 때문에 요청이 올때마다 리패치시킨다.

---

## **fetch - 비동기에서** **CSR**

\- 클라이언트 컴포넌트를 사용

```
"use client";
import React, { useEffect } from "react";
import styles from "./textArticle.module.css";

function TextArticle() {
  const [test, setTest] = React.useState("데이터 가지고오는중...");

  useEffect(() => {
    fetch(""https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((data) => setTest(data.data[0]));
  }, []);

  return <article className={styles.article}>{test}</article>;
}

export default TextArticle;
```

\- "use client" 컴포넌트 상단에 클라이언트 컴포넌트임을 작성

[##_Image|kage@Xsb1C/btshiFedQmX/t6OT4EdS0GyPjmW33JF4UK/img.png|CDM|1.3|{"originWidth":1354,"originHeight":1106,"style":"alignCenter","width":500,"height":408}_##]

\- build 후 확인해보면 정적페이지가 불러오고 그뒤에 클라이언트 컴포넌트가 실행되며 비동기로 데이터를 가지고오는걸 확인할 수 있다.

**fetch함수를 사용하면 get메서드같은 경우는 next에서 자동으로 중복되는 요청들을 필터링해준다.**  
**\* Post같이 요청값이 가게되면 제외**

---

## **API route Handlers**

```
app
  ㄴproducts
    ㄴapi
      ㄴroute.ts
```

\- app안에 사용할 디렉토리내에서 api내에 route.ts 파일을 생성하여 작성

**NextRequest, NextResponse** API를 통해서 손쉽게 API핸들러를 사용할 수 있다.

```
export async function GET(request: Request) { // Request type
  const products = await getProducts();
  return NextResponse.json({ products });
}
```

\- 기존에 조건문을 사용했던것과는 달리 각 디렉토리별로 사용할 CURD 메서드에 맞는 이름으로 함수 작성

ex

```
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token}` },
  });
}
```

\- 쿠키를 사용할수도있다.

[Routing: Route Handlers | Next.js

Using App Router Features available in /app

nextjs.org](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)
