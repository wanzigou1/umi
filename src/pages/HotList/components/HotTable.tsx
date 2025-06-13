import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TableColumnsType } from 'antd';
import { Table } from 'antd';
import React, { useState } from 'react';

interface DataType {
  key: string;
  name: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row: React.FC<Readonly<RowProps>> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

type HotTableProps = {
  data: string[];
};
const HotTable: React.FC<HotTableProps> = ({ data }) => {
  const [dataSource, setDataSource] = useState(
    data.map((i) => {
      return { name: i, key: i };
    }),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.name === active.id);
        const overIndex = prev.findIndex((i) => i.name === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        // rowKey array
        items={dataSource.map((i) => i.name)}
        strategy={verticalListSortingStrategy}
      >
        <Table<DataType>
          showHeader={false}
          components={{
            body: { row: Row },
          }}
          size="small"
          rowKey="key"
          columns={columns}
          dataSource={dataSource}
        />
      </SortableContext>
    </DndContext>
  );
};

export default HotTable;
