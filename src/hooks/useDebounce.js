// Hook này tạo ra để trì hoãn việc cập nhật giá trị trong 1 khoảng thời gian nhất định
// Tức là khi gõ liên tục, nó chưa thay đổi gtri ngay mà chỉ đổi khi ngừng gõ 1 lúc
// Khi người dùng ngừng gõ 500ms thì debounceValue mới nhận giá trị mới searchValue

      import { useEffect, useState } from "react";

      function useDebounce(value, delay) {
        // ban đầu thằng debounceValue là chuỗi rỗng vì bên searchValue gtri mặc định là chuỗi rỗng

        const [debounceValue, setDebounceValue] = useState(value);

        useEffect(() => {
          const handler = setTimeout(() => setDebounceValue(value), delay);

          return () => clearTimeout(handler);
        }, [value]);

        return debounceValue;
      }

      export default useDebounce;
